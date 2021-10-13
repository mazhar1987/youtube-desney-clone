import React from 'react';
import styled from 'styled-components';
import ImageSlider from '../ImageSlider/ImageSlider';
import Viewers from '../Viewers/Viewers';

function Home() {
	return (
		<Container>
			<ImageSlider />
			<Viewers />
		</Container>
	);
}

const Container = styled.main`
	position: relative;
	min-height: calc(100vh - 250px);
	overflow-x: hidden;
	top: 72px;
	display: block;
	padding: 0 calc(3.5vw + 5px);

	&::after {
		content: '';
		background-image: url('/images/home-background.png');
		background-size: cover;
		background-attachment: fixed;
		background-position: center center;
		background-repeat: no-repeat;
		position: absolute;
		inset: 0px;
		opacity: 1;
		z-index: -1;
	}
`;

export default Home;
