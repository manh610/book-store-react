import React, { useEffect, useState } from 'react';
import './style.css'
import { useParams } from 'react-router';
import { Row, Col, Input, Select, Upload, Button, Image, Divider, DatePicker, Modal } from 'antd';
import { createBookAPI, getAllCategoryAPI, getBookByIdAPI, updateBookAPI } from '../../apis';
import { userService } from '../../service/user';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from 'react-router-dom';

const { TextArea } = Input;

const BookInfo = () => {

    toast.configure();

    const { id } = useParams()

    const [backToAdmin, setBackToAdmin] = useState(false);

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [page, setPage] = useState('')
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [price, setPrice] = useState('')

    const [listCategory, setListCategory] = useState([]);

    const getAllCategory = async () => {
        await getAllCategoryAPI()
            .then(res => {
                let data = res.data.data;
                let tmp = [];
                for ( let i = 0; i < data.length; i++) {
                    tmp.push({
                        value: data[i].id,
                        label: data[i].name
                    })
                }
                setListCategory(tmp);
            })
            .catch(err => console.log(err))

    }

    const dateFormat = 'DD/MM/YYYY';

    const handleChooseCategory = (option) => {
        setCategory(option)
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
                    console.log(book)
                    setTitle(book.title);
                    setAuthor(book.author)
                    setDate(book.date)
                    setPrice(book.price)
                    setDescription(book.description)
                    setCategory(book.category.id)
                    setPage(book.page)
                    setImageUrl(book.imageUrl)
                    
                } else {
                    toast.error(res.data.message,{
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllCategory();
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
            setDate('04/04/2023')
            setEditable(false)
            setTitleButtonAction('Save')
            return;
        } 
        const check = checkValidate();
        if ( check==false ) {
            toast.error('Bạn cần điền đầy đủ thông tin', {
                position: toast.POSITION.TOP_CENTER
            })
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
        const t = date.split("/")
        const b = new Date(`${t[2]}-${t[1]}-${t[0]}`).toISOString()
        const payload = {
            id: id,
            title: title,
            categoryId: category,
            author: author,
            date: b,
            page: page,
            sold: 0,
            price: price,
            imageUrl: imageUrl,
            description: description
        }

        console.log(payload)
        await updateBookAPI(payload)
            .then(res => {
                if ( res.data.statusCode=='OK' ) {
                    toast.success('Cập nhật sách thành công');
                    getData()
                    setEditable(true)
                    setTitleButtonAction('Edit')
                    setBackToAdmin(true);
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
        const t = date.split("/")
        const b = new Date(`${t[2]}-${t[1]}-${t[0]}`).toISOString()
        const payload = {
            title: title,
            categoryId: category,
            author: author,
            date: b,
            userId: user.id,
            page: page,
            sold: 0,
            price: price,
            imageUrl: imageUrl,
            description: description
        }
        console.log(payload)
        await createBookAPI(payload)
            .then(res => {
                if ( res.data.statusCode=='OK' ) {
                    toast.success('Tạo sách thành công');
                    clearInput()
                    handleClose()
                    setBackToAdmin(true);
                } else {
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const checkValidate = () => {
        if ( title=='' || author=='' || date=='' || price=='' || description=='' || category=='' || page=='' || imageUrl=='')
            return false;
        return true;
    }

    const clearInput = () => {
        setTitle('');
        setAuthor('')
        setDate('')
        setPrice('')
        setDescription('')
        setCategory('')
        setPage('')
        setImageUrl('')
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
                            <DatePicker className='select-category' disabled={editable} onChange={onSelectDate} format={dateFormat} />
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
            {
                backToAdmin && <Redirect  to="/admin" replace={true}/>
            }
        </div>
    )
}

export default BookInfo;