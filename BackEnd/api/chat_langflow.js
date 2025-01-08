// Note: Replace **<YOUR_APPLICATION_TOKEN>** with your actual Application token

class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }
    async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        headers["Content-Type"] = "application/json";
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = event => {
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            console.log('Init Response:', initResponse);
            if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            onError('Error initiating session');
        }
    }
}

async function chat_main(inputValue, inputType = 'chat', outputType = 'chat', stream = false) {
    const flowIdOrName = '4db6c10f-41f0-4de1-bef1-6fa943f290bb';
    const langflowId = '0258b77c-c5da-4ae1-96f7-9a0846f44c5e';
    const applicationToken = 'AstraCS:lOxDpgwZZlGdgNgnaAgLyKjy:d04c45691e65f742e053a1c71a0d0341e9b0d901316e58183764fe3592cc1f63';
    const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com',
        applicationToken);

    try {
        const tweaks = {
            "ChatInput-zGNbi": {},
            "ChatOutput-HSa27": {},
            "Memory-iPk9i": {},
            "Prompt-GyGge": {},
            "GoogleGenerativeAIModel-attJZ": {}
        };
        response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputValue,
            inputType,
            outputType,
            tweaks,
            stream,
            (data) => console.log("Received:", data.chunk), 
            (message) => console.log("Stream Closed:", message), 
            (error) => console.log("Stream Error:", error) 
        );
        if (!stream && response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const output = firstComponentOutputs.outputs.message;
            return output;
        }
    } catch (error) {
        console.error('Main Error', error.message);
    }
}

module.exports = chat_main;

