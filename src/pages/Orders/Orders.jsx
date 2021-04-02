import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser] = useContext(UserContext);
    const {uid} = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(loggedInUser?.uid) {
            let orderedBooks = []
            axios.get(`${process.env.REACT_APP_SERVER}/order/${uid}`)
                .then(res => {
                    res.data.forEach(async (order) => {
                        const singleOrder = await axios.get(`${process.env.REACT_APP_SERVER}/books/${order.bookId}`)
                        if(singleOrder.data !== '' || null){
                            orderedBooks = [...orderedBooks, singleOrder.data];
                            setBooks(orderedBooks)
                        }
                    })
                })
                .catch(err => console.log(err))
        }
    }, [uid,loggedInUser])

    if(!books.length) {
        return (
            <h4 className="text-warning text-center mt-5">You haven't order any book yet</h4>
        )
    }
    if(books) {

        return(
            <div className="container-fluid p-5">
                <table className="table border">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">AUTHOR</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books?.map((book, index) => (
                                <tr key={book?._id} >
                                    <th scope="row">{index + 1}</th>
                                    <td>{book?.name}</td>
                                    <td>{book?.author}</td>
                                    <td>{book?.price}</td>
                                    <td>
                                        <small className="text-success">Order is taken</small>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
    
        );
    }
    return (
        <>
            {loading && (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </>
    )
};

export default Orders;