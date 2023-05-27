import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import stand from '../../assets/stand.png';
import first from '../../assets/book7.png'
import second from '../../assets/book9.png'
import third from '../../assets/book12.png'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './style.css';
import Exclusive from '../../components/Exclusive/Exclusive';
import { userService } from '../../service/user';

export default function Home() {
	
	useEffect(() => {
		const check = localStorage.getItem('check');
		if ( check==null ) {
			localStorage.setItem("check", 1);
			window.location.reload()
		}
	}, [])

	return (
		<div className='home'>
		
		<OwlCarousel className='owl-theme' loop margin={10} items={1} dots={false} autoplay={true} nav>
			<div className='item d-flex align-items-center justify-content-center'>
				<div className='books d-flex justify-content-between'>
					<img src={first} alt='' className='img-fluid first'/>
					<img src={second} alt='' className='img-fluid second'/>
					<img src={third} alt='' className='img-fluid third'/>
				</div>
				<img src={stand} alt='' className='img-fluid stand'/>
			</div>
			<div className='item item2'>
				<div className='d-flex container text-page'>
				<div className='kalam'>
					<h2>CHOOSE YOU BRAIN FOOD</h2>
					<p>SALES UP TO 70% OFF</p>
					<h5>History / Novel / Health and Beauty</h5>  
					<Link to='/'><button className='btn'>Shop Now</button></Link>
				</div>
				<div className='books2 d-flex'>
					<img src={first} alt='' className='img-fluid first2'/>
					<img src={second} alt='' className='img-fluid second2'/>
					<img src={third} alt='' className='img-fluid third2'/>
				</div>
				</div>
			</div>
		</OwlCarousel>
		
		<section className='info-column container'>
			<div className='row'>
			<div className='col-md-4 d-flex'>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
				<path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
				</svg>
				<div>  
				<h5>24/7 CUSTOMER SUPPORT</h5>
				<p>Call: + 0123 456 789</p>
				</div>    
			</div>
			<div className='col-md-4 d-flex'>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-truck-flatbed" viewBox="0 0 16 16">
				<path d="M11.5 4a.5.5 0 0 1 .5.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-4 0 1 1 0 0 1-1-1v-1h11V4.5a.5.5 0 0 1 .5-.5zM3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1.732 0h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4a2 2 0 0 1 1.732 1z"/>
				</svg>
				<div>  
				<h5>FREE SHIPPING WORLD WIDE</h5>
				<p>On Order Over $99</p>
				</div>    
			</div>
			<div className='col-md-4 d-flex'>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
				<path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
				</svg>
				<div>  
				<h5>MONEY BACK GUARANTEE</h5>
				<p>45 Days Return Service</p>
				</div>    
			</div>
			</div>
		</section>
		
		<Exclusive />
		
		</div>
	)
}
