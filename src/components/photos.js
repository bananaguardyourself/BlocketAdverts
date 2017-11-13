/**
 * Created by Ilya on 06.09.2017.
 */
import React, {Component}  from 'react';
import PropTypes from 'prop-types';

export default class Photos extends Component {

    onHandleSelectImage(selectedImage, i) {
        this.bigImage.src = selectedImage;
        this.bigImage.imageid = i;
    }

    onHandleImageClick(images) {
        let src = this.bigImage.src;
        for (let i = 0; i < images.length; i++) {
            if (this.bigImage.src.replace(/%20/g, ' ') === images[i]) {
                if (i+1 === images.length) {
                    src = images[0];
                }
                else {
                    src = images[i+1];
                }
            }
        }

        this.bigImage.src = src;
    }

    render() {

        let images = this.props.pictures;
        return (
            <div>
                <div className='selected-image'>
                    <div key='0'>
                        {images[0] ? <img src={images[0]} ref={img => this.bigImage = img}
                                          onClick={::this.onHandleImageClick.bind(this, images)}/> : null}
                    </div>
                </div>
                <div className='image-thumbnail'>
                    {images.map((image, i) => (
                        <div key={i} onClick={::this.onHandleSelectImage.bind(this, image, i)}>
                            <img src={image}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

Photos.propTypes = {
    pictures: PropTypes.array
};
