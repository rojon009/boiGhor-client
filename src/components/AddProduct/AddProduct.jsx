import axios from 'axios';
import React, { useState } from 'react';



const AddProduct = () => {

    const [bookDetails, setBookDetails] = useState({
        name: '',
        author: '',
        price: '',
        imgFile: ''
    });

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'imgFile') {
            setBookDetails({ ...bookDetails, [e.target.name]: e.target.files[0] });
        } else {
            setBookDetails({ ...bookDetails, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bookDetails);
        if (bookDetails.imgFile) {
            const imageData = new FormData();
            imageData.set('key', process.env.REACT_APP_IMAGE_BB_KEY);
            imageData.append('image', bookDetails.imgFile);
            axios.post('https://api.imgbb.com/1/upload', imageData)
                .then((response) => {
                    const imgUrl = response.data.data.display_url;
                    if (imgUrl) {
                        axios.post(`${process.env.REACT_APP_SERVER}/addBook`, { name: bookDetails.name, author: bookDetails.author, price: bookDetails.price, imgUrl })
                            .then(res => {
                                if(res.data) {
                                    setBookDetails({
                                        name: '',
                                        author: '',
                                        price: '',
                                        imgFile: ''
                                    })
                                    document.querySelector("form").reset();
                                }
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="col bg-info">
            <div className="row g-3 p-5">
                <div className="col-6">
                    <input name="name" onChange={handleChange} value={bookDetails.name} type="text" className="form-control" placeholder="Book Name" required />
                </div>
                <div className="col-6">
                    <input name="author" onChange={handleChange} value={bookDetails.author} type="text" className="form-control" placeholder="Author Name" required />
                </div>
                <div className="col-6">
                    <input name="price" onChange={handleChange} value={bookDetails.price} type="number" className="form-control" placeholder="Price" required />
                </div>
                <div className="col-6">
                    <input id="imgFileInput" name="imgFile" onChange={handleChange} type="file" accept="image/*" className="form-control" placeholder="Book Name" required />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-warning">SAVE</button>
                </div>
            </div>
        </form>
    );
};

export default AddProduct;