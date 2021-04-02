import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../../components/BookCard/BookCard';

export

    const Home = () => {

        const [loading, setLoading] = useState(true);

        const [books, setBooks] = useState(null);
        useEffect(() => {
            axios.get(`${process.env.REACT_APP_SERVER}/books`)
                .then(res => res.data)
                .then(data => {setBooks(data); setLoading(false)})
        }, [])

        if (books) {
            return (
                <>
                    
                    <div className="container pt-5">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                            {
                                books.map(book => <BookCard key={book._id} {...book} />)
                            }
                        </div>
                    </div>
                </>
            );
        }
        return <>
                    {
                        loading && (
                            <div class="d-flex justify-content-center mt-5 pt-5">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                    }
            </>
    };

export default Home;