import React, { useEffect, useState } from "react";
import { userService } from "../../service/user";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom';
import './style.css';
import { deleteBookAPI, getBooksAPI } from "../../apis";

import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const column = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author'
    },
    {
        title: 'Category',
        dataIndex: 'categoryName',
        key: 'categoryName'
    },
    {
        title: 'Date',
        dataIndex: 'date1',
        key: 'date1'
    },
    {
        title: 'Page',
        dataIndex: 'page',
        key: 'page'
    },
    {
        title: 'Sold',
        dataIndex: 'sold',
        key: 'sold'
    },
    {
        title: '',
        dataIndex: 'actionView',
        key: 'actionView'
    },
    {
        title: '',
        dataIndex: 'actionDel',
        key: 'actionDel'
    },
]

const Admin = () => {

    toast.configure();
    
    const initUser = {
        id: 1,
        username: 'manh610',
        role: 'USER'
    }

    const user = userService.get() || initUser;

    console.log(user)


    const getDataBook = async () => {
        await getBooksAPI()
            .then(res => {
                if ( res.data.statusCode=='OK' ) {
                    let data = res.data.data;
                    let tmp = [];
                    for ( let i = 0; i < data.length; i++) {
                        tmp.push({
                            ...data[i],
                            categoryName: data[i].category.name,
                            date1: new Date(data[i].date).toLocaleDateString(),
                            actionView: user.role=='ADMIN'?<Link to={`/manage-book/${data[i].id}`}><Button className="btn-view-book">View</Button></Link>:null,
                            actionDel: user.role=='ADMIN'?<Button onClick={() => handleOpen(data[i].id)} className="btn-del-book">Delete</Button>:null,
                        })
                    }
                    setBooks(tmp)
                }
            })
    }


    const deleteBook = async () => {
        const payload = {id: idDel}
        await deleteBookAPI(payload)
            .then(res => {
                if ( res.data.statusCode=='OK' ) {
                    toast.success('Xóa sách thành công', {
                        position: toast.POSITION.TOP_CENTER
                    })
                    getDataBook();
                    handleClose()
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getDataBook()
    }, [])

    const [idDel, setIdDel] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setIdDel(id)
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
        deleteBook();
    }

    const [books, setBooks] = useState([]);

    return (
        <div className="container content-admin">
            { user!=null && user.role=='ADMIN' && <Link to='/manage-book/-1'><Button className="btn-add-book">Add Book</Button></Link>}
            <Table 
                columns={column}
                dataSource={books}
                pagination={{
                    defaultPageSize: 7
                }}
            />
            <Modal 
                title="Bạn có chắc chắn muốn xóa không" 
                open={open} 
                onOk={handleOk} 
                onCancel={handleClose}>
            </Modal>
        </div>
    )
}

export default Admin;