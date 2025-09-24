const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

class BedrockAI {
    constructor(key, model) {
        this.key = key;
        this.model = model;
        this.client = new BedrockRuntimeClient({
            region: 'us-west-2',
            credentials: {
                accessKeyId: key.accessKeyId,
                secretAccessKey: key.secretAccessKey,
            }
        });
    }

    async generateImage(prompt) {
        const body = JSON.stringify({
            prompt,
            mode: 'text-to-image'
        });

        const command = new InvokeModelCommand({
            modelId: this.model,
            body: body
        });

        try {
            const response = await this.client.send(command);
            const modelResponse = JSON.parse(new TextDecoder("utf-8").decode(response.body));
            const base64ImageData = modelResponse.images[0];
            
            // Here, you would process the base64ImageData similar to the Python example.
            // For example, saving the image to disk.

            console.log({ base64ImageData });
        } catch (error) {
            console.error('Error generating image:', error);
        }
    }
}

// Usage example:
const key = {
    accessKeyId: "your-access-key-id",
    secretAccessKey: "your-secret-access-key"
};

const ai = new BedrockAI(key, "stability.stable-image-ultra-v1:0");

ai.generateImage("A futuristic cityscape at dusk with neon lights");
