import React, { useEffect, useState } from 'react';
import './style.css'
import { useParams } from 'react-router';
import { Row, Col, Input, Select, Upload, Button, Image, Divider, DatePicker, Modal } from 'antd';
import { createBookAPI, getBookByIdAPI, updateBookAPI } from '../../apis';
import { userService } from '../../service/user';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const { TextArea } = Input;

const listCategory = [
    {
        value: 'Truyện ngắn',
        label: 'Truyện ngắn',
    },
    {
        value: 'Tiểu thuyết',
        label: 'Tiểu thuyết',
    },
    {
        value: 'Truyện tranh',
        label: 'Truyện tranh',
    }
]

const BookInfo = () => {

    toast.configure();

    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [page, setPage] = useState('')
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [price, setPrice] = useState('')

    const dateFormat = 'DD/MM/YYYY';

    const handleChooseCategory = (option) => {
        setCategory(option.label)
    }

    const handleChooseImage = (e) => {
        const path = e.target.value;
        const splits = path.split('\\');
        const fileName = splits[splits.length - 1]
        setImageUrl('./image/'+fileName)
    }

    const getData = async () => {
        const payload = {id: id}
        await getBookByIdAPI(payload)
            .then(res => {
                if ( res.data.statusCode=='OK' ){
                    let book = res.data.data;
                    setTitle(book.title);
                    setAuthor(book.author)
                    setDate(book.date)
                    setPrice(book.price)
                    setDescription(book.description)
                    setCategory(book.category)
                    setPage(book.page)
                } else {
                    toast.error(res.data.message,{
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if ( id > 0 ) {
            setTitleButtonAction('Edit');
            getData()
            setEditable(true)
        } else {
            setTitleButtonAction('Add');
            setEditable(false)
        }
    }, [])

    const [titleButtonAction, setTitleButtonAction] = useState('')

    const [editable, setEditable] = useState()

    const handleAction = () => {
        if ( titleButtonAction=='Edit' ) {
            setEditable(false)
            setTitleButtonAction('Save')
            return;
        } 
        if ( titleButtonAction=='Add') {
            handleOpen();
        }
        if ( titleButtonAction=='Save') {
            handleSave();
        }
    }

    const handleSave = async () => {
        const payload = {
            id: id,
            title: title,
            category: category,
            author: author,
            date: date,
            userId: user.id,
            page: page,
            sold: 0,
            price: price,
            imageUrl: imageUrl,
            description: description
        }
        await updateBookAPI(payload)
            .then(res => {
                if ( res.data.statusCode=='OK' ) {
                    toast.success('Tạo sách thành công');
                    clearInput()
                } else {
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const user = userService.get();

    const handleAddBook = async () => {
        const payload = {
            title: title,
            category: category,
            author: author,
            date: date,
            userId: user.id,
            page: page,
            sold: 0,
            price: price,
            imageUrl: imageUrl,
            description: description
        }
        await createBookAPI(payload)
            .then(res => {
                if ( res.data.statusCode=='OK' ) {
                    toast.success('Tạo sách thành công');
                    clearInput()
                } else {
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const clearInput = () => {
        setTitle('');
        setAuthor('')
        setDate('')
        setPrice('')
        setDescription('')
        setCategory('')
        setPage('')
    }

    const onSelectDate = (date, dateString) => {
        setDate(dateString)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
        handleAddBook()
    }

    return( 
        <div className="container content-book-info">
            <Row className='title-page'>
                <p className='title-page-content'>Sách</p>
            </Row>
            <Row>
                <Col span={11}>
                    <Row>
                        <Col span={10}>
                            <p className='bold'>Tiêu đề  <span style={{color: 'red'}}>*</span></p>
                            <Input disabled={editable} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Col>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <p className='bold'>Tác giả <span style={{color: 'red'}}>*</span></p>
                            <Input disabled={editable} value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </Col>
                    </Row>
                    <p className='bold space'>Mô tả về sách</p>
                    <TextArea disabled={editable} value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
                    <Row>
                        <Col span={10}>
                            <p className='bold space'>Ngày phát hành <span style={{color: 'red'}}>*</span></p>
                            <DatePicker className='select-category' defaultValue={date} disabled={editable} onChange={onSelectDate} format={dateFormat} />
                        </Col>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <p className='bold space'>Số trang</p>
                            <Input disabled={editable} value={page} onChange={(e) => setPage(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <p className='bold space'>Thể loại</p>
                            <Select 
                                disabled = {editable}
                                className='select-category'
                                labelInValue
                                value={category}
                                onChange={handleChooseCategory}
                                options={listCategory}
                            />
                        </Col>
                        <Col span={4}></Col>
                        <Col span={10}>
                            <p className='bold space'>Giá</p>
                            <Input disabled={editable} value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Col>
                    </Row>
                    
                </Col>
                <Col span={2}></Col>
                <Col className='up-image' span={11}>
                    <Row>
                        <Col span={4}>
                            <p className='bold upload'>Upload image: </p>
                        </Col>
                        <Col span={2}></Col>
                        <Col>
                            <Input disabled={editable} type='file' onChange={handleChooseImage} />
                        </Col>
                    </Row>
                    
                    { imageUrl!='' && <img  src={imageUrl} height={480}/>}
                </Col>
            </Row>
            <Divider className='line' />
            <Button onClick={handleAction} type='primary' className='btn-action'>{titleButtonAction}</Button>
            <Modal 
                title="Bạn có chắc chắn muốn tạo sách này không" 
                open={open} 
                onOk={handleOk} 
                onCancel={handleClose}>
            </Modal>
        </div>
    )
}

export default BookInfo;