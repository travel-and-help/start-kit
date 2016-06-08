import React, { Component } from 'react';

const cameraError = (message) => {
    console.log(`Failed because: ${message}`);
};

class CreatePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inlineStyle: {}
        };
        this.cameraSuccess = this.cameraSuccess.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!navigator.camera || !navigator.camera.getPicture) return;
        navigator.camera.getPicture(this.cameraSuccess, cameraError, {
            destinationType: navigator.camera.DestinationType.DestinationType.DATA_URL,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        });
    }

    cameraSuccess(imageData) {
        this.setState({
            inlineStyle: {
                background: `url(data:image;base64,${imageData})`,
                backgroundSize: 'cover'
            }
        });
    }

    render() {
        const { inlineStyle } = this.state;
        return (
            <div className="create-photo"
                 onClick={ this.onClick }
                 style={ inlineStyle }
            ></div>
        );
    }
}

export default CreatePhoto;
