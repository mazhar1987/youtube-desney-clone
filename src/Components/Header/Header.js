import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { auth, provider } from '../../firebase';
import {
	selectUserName,
	selectUserPhoto,
	setUserLoginDetails,
} from '../../features/user/userSlice';

const Header = (props) => {
	// Allow us to acess dispatch, history, username and user photo
	const dispatch = useDispatch();
	const history = useHistory();
	const userName = useSelector(selectUserName);
	const userPhoto = useSelector(selectUserPhoto);

	// Make authentication
	const handleAuth = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				console.log(result);
				setUser(result.user);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	/**
	 * Set user login details
	 * @param {*} user
	 */
	const setUser = (user) => {
		dispatch(
			setUserLoginDetails({
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
			})
		);
	};

	console.log(userPhoto);

	return (
		<Nav>
			<Logo>
				<img src='/images/logo.svg' alt='Disney Clone' />
			</Logo>

			{!userName ? (
				<Login onClick={handleAuth}>Login</Login>
			) : (
				<>
					<NavMenu>
						<a href='/home'>
							<img src='/images/home-icon.svg' alt='Home' />
							<span>Home</span>
						</a>
						<a href='/search'>
							<img src='/images/search-icon.svg' alt='Search' />
							<span>Search</span>
						</a>
						<a href='/watchlist'>
							<img
								src='/images/watchlist-icon.svg'
								alt='Watchlist'
							/>
							<span>Watchlist</span>
						</a>
						<a href='/originals'>
							<img
								src='/images/original-icon.svg'
								alt='Orginals'
							/>
							<span>Orginals</span>
						</a>
						<a href='/movies'>
							<img src='/images/movie-icon.svg' alt='Movies' />
							<span>Movies</span>
						</a>
						<a href='/series'>
							<img src='/images/series-icon.svg' alt='Series' />
							<span>Series</span>
						</a>
					</NavMenu>
					<UserImg src={userPhoto} alt={userName} />
				</>
			)}
		</Nav>
	);
};

const Nav = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 70px;
	background-color: #090b13;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 36px;
	letter-spacing: 16px;
	z-index: 3;
`;

const Logo = styled.a`
	padding: 0;
	width: 80px;
	max-height: 70px;
	font-size: 0;
	display: inline-block;

	img {
		display: block;
		width: 100%;
	}
`;

const NavMenu = styled.div`
	align-items: center;
	display: flex;
	flex-flow: row nowrap;
	height: 100%;
	justify-content: flex-end;
	margin: 0;
	padding: 0;
	position: relative;
	margin-right: auto;
	margin-left: 25px;

	a {
		display: flex;
		align-items: center;
		padding: 0 12px;

		img {
			height: 20px;
			min-width: 20px;
			width: 20px;
			z-index: auto;
		}

		span {
			color: rgb(249, 249, 249);
			font-size: 13px;
			letter-spacing: 1.42px;
			line-height: 1.08;
			text-transform: uppercase;
			padding: 2px 0;
			white-space: nowrap;
			position: relative;

			&::before {
				background-color: rgb(249, 249, 249);
				border-radius: 0 0 4px 4px;
				bottom: -6px;
				content: '';
				height: 2px;
				left: 0px;
				opacity: 0;
				position: absolute;
				right: 0px;
				transform-origin: left center;
				transform: scaleX(0);
				transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
				visibility: hidden;
				width: auto;
			}
		}

		&:hover {
			span::before {
				transform: scaleX(1);
				visibility: visible;
				opacity: 1;
			}
		}
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

const Login = styled.a`
	background-color: rgba(0, 0, 0, 0.6);
	padding: 8px 16px;
	text-transform: uppercase;
	letter-spacing: 1.5px;
	border: 1px solid #f9f9f9;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease 0s;

	&:hover {
		background-color: #f9f9f9;
		color: #000;
		border-color: transparent;
	}
`;

const UserImg = styled.img`
	height: 100%;
`;

export default Header;
