### README for Climate Wavers Models Microservice

---

# Climate Wavers Models Microservice

## Overview
The Climate Wavers Models Microservice provides two primary machine learning models: the Magnitude Analysis Model and the Disaster Recognition Model. These models are integral to our mission of predicting and responding to climate-based disasters, leveraging historical data and advanced machine learning techniques.

## Models

### 1. Magnitude Analysis Model
This model is designed to analyze and predict the magnitude of climate-based disasters.

#### Data Sources
- **NOAA (National Oceanic and Atmospheric Administration):** We collect data on all recorded disasters in history.
- **Visual Weather Sites:** We obtain climate data corresponding to the time of each disaster.

#### Dataset Generation
- **Historical Data:** Aggregated from NOAA, including disaster type, location, date, and impact metrics.
- **Climate Data:** Extracted from visual weather sites, synchronized with the disaster events to form a comprehensive dataset.

#### Model Building
- **Machine Learning Techniques:** The model is constructed using a variety of algorithms, with a focus on optimizing for accuracy in magnitude prediction.
- **Tools and Libraries:** Scikit-learn, Random Forest Classifier, and Intel scikit-learn Extension.

### 2. Disaster Recognition Model
This model is aimed at recognizing and categorizing different types of disasters from images and other data sources.

#### Data Sources
- **Kaggle:** We leverage publicly available datasets on Kaggle that pertain to disasters image.

#### Dataset Preparation
- **Finetuning ResNet:** We fine-tune the ResNet architecture on our curated dataset using TensorFlow.
- **Quantization:** The model undergoes quantization to optimize performance and reduce latency in inference.

## Endpoints
IN progress




## Contributing
We welcome contributions from the community. Please read our [Contributing Guide](CONTRIBUTING.md) for more details on how to get started.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.

---