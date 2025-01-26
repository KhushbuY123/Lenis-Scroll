'use client';
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

const Handpicked = () => {
  const HandpickedSvgRef = useRef(null);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScroll = scrollTop / (docHeight - windowHeight); // Normalize scroll value
      setScrollOffset(totalScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // // Update the primary SVG paths
  // useEffect(() => {
  //   const svg = HandpickedSvgRef.current;
  //   if (svg) {
  //     const paths = svg.querySelectorAll('.half_line');
  //     paths.forEach((path) => {
  //       const pathLength = path.getTotalLength();
  //       path.style.strokeDasharray = pathLength;
  //       path.style.strokeDashoffset =
  //         pathLength * (1 - scrollOffset * 3.6 + 0.95); // Update based on scroll
  //     });
  //   }
  // }, [scrollOffset]);

  // Update the second SVG paths when scrolled 50%
  useEffect(() => {
    const updatePathAnimation = (HandpickedSvgRef, startOffset, endOffset) => {
      const svg = HandpickedSvgRef.current;
      if (svg) {
        const paths = svg.querySelectorAll('.man-svg-path');
        paths.forEach((path) => {
          const pathLength = path.getTotalLength();
          const progress = Math.min(
            Math.max(
              (scrollOffset - startOffset) / (endOffset - startOffset),
              0
            ),
            1
          ); // Normalize progress between 0 and 1
          path.style.strokeDasharray = pathLength;
          path.style.strokeDashoffset = pathLength - pathLength * progress;
        });
      }
    };

    updatePathAnimation(HandpickedSvgRef, 0.5, 1); // Trigger animation at 50% scroll
  }, [scrollOffset]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        zIndex: 0,
        background: 'black',
      }}
    >
      <Box
        ref={HandpickedSvgRef}
        sx={{
          position: 'absolute',
          top: '45.5%',
          left: '77%',
        }}
      >
        <svg
          width="203"
          height="445"
          viewBox="0 0 203 445"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="man-svg-path"
            d="M111.51 4.50549C110.085 2.84557 109.254 1.89705 107.473 0.592827C107.473 0.948523 107.711 2.727 108.067 4.50549C106.999 2.727 104.98 2.01561 104.149 0C104.149 1.30422 104.624 1.89705 104.624 3.20127C101.894 3.0827 97.1454 3.55696 94.8898 4.14979C89.0729 5.45401 85.8676 6.04684 80.5255 8.77384C78.6261 9.72236 74.946 11.738 76.2518 14.9392C76.2518 14.9392 74.7085 11.6194 73.9963 10.6709C73.284 9.6038 72.3343 9.01097 71.0284 8.77384C70.1974 8.65527 67.7045 9.48523 68.1793 12.3308C68.5354 14.5835 70.9097 18.6148 73.4027 20.1561C73.4027 20.1561 70.0787 17.9034 68.7729 16.7177C67.7045 15.8878 66.3986 15.1764 65.0927 15.6506C64.143 16.0063 63.6682 17.0734 63.5495 18.0219C63.3121 20.0376 65.4489 22.4089 66.9922 23.3574C65.9237 22.646 63.9056 20.7489 62.5998 20.5118C61.2939 20.2747 59.9881 20.2747 59.632 21.4603C59.2758 22.646 60.3442 24.6616 61.1752 25.6101C62.2436 26.7958 64.2618 28.5743 65.6863 29.4042C64.3805 28.93 62.7185 27.6257 61.4127 27.27C60.1068 26.9143 58.0887 27.7443 57.9699 29.1671C57.6138 32.7241 61.2939 33.1983 62.4811 32.9612C60.4629 33.4354 58.2074 33.0797 56.7828 34.5025C55.3582 35.9253 54.8834 38.0595 56.6641 39.008C59.9881 40.7865 63.5495 38.2966 64.4992 37.3481C63.312 38.6523 60.9378 39.6008 61.0565 41.2608C61.1752 43.0392 62.5998 43.2764 62.5998 43.2764C61.4127 43.2764 60.2255 43.1578 59.0384 43.1578C57.7325 43.0392 56.4267 43.0392 55.1208 42.8021C54.646 42.6835 54.1711 42.565 53.6963 42.4464C54.7647 43.2764 55.5957 44.3435 56.4267 45.4106C58.4448 48.1376 60.3442 50.8646 62.2436 53.7101C62.0062 53.8287 61.7688 53.7101 61.6501 53.5916L53.9337 47.5447C55.3583 49.4418 61.8875 58.8084 62.0062 59.1641C61.4127 59.1641 53.2214 52.8802 53.1027 52.7616C56.1893 56.6743 59.5132 60.3498 61.5313 63.5511C58.8009 61.5354 55.2395 60.3498 52.0343 59.2827C53.9337 61.1797 64.2618 75.1705 65.5676 76.4747C65.5676 76.4747 62.1249 71.3764 59.0384 73.5106C55.9518 75.6447 55.1208 85.0114 59.1571 96.038C63.1933 107.065 68.6542 105.405 68.6542 105.405C68.6542 105.405 66.1612 127.458 76.8454 131.845C76.8454 131.845 70.0787 134.216 64.1431 138.722C58.2074 143.227 54.1711 149.037 54.1711 149.037C54.1711 149.037 15.9454 160.063 6.2109 168.007C-2.81132 175.358 0.512628 190.06 0.987482 200.02C1.81848 215.078 2.41206 230.254 3.59919 245.312C4.19276 253.137 7.63545 268.788 16.6577 271.87L17.8448 302.46C17.8448 302.46 14.877 307.914 15.2331 317.4C15.5892 327.003 18.4384 333.406 18.6758 333.287C18.6758 333.287 13.6898 337.437 13.4524 345.974C13.215 354.511 13.5711 364.944 16.539 368.383L8.58517 707.598"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M114.358 1.30371C114.358 3.20076 114.358 4.62354 114.358 6.52059L116.614 1.54084C116.495 2.7265 117.208 6.99485 117.445 7.11341C118.039 7.23198 121.125 3.67502 121.837 2.84506C122.55 3.91215 123.262 6.04633 123.499 7.23198C123.499 7.23198 126.348 4.62354 127.536 3.43789L128.604 7.35055C130.622 6.87628 133.827 7.23198 137.508 8.06194C141.306 8.8919 144.63 10.7889 145.699 11.3818C148.31 13.0417 150.21 15.2944 150.447 15.1759C151.278 15.0573 152.94 13.6345 153.059 13.2788C153.059 13.5159 152.584 18.4957 152.822 19.7999C154.127 19.2071 157.451 18.97 157.451 18.97C155.671 18.97 154.721 22.5269 154.721 22.5269C157.214 21.697 159.944 24.1868 159.944 24.1868C157.214 24.0683 156.146 25.9653 156.146 25.9653C158.164 26.2024 156.977 28.8109 156.977 28.8109C159.47 26.4396 164.574 24.7797 165.405 28.2181C166.236 31.6565 159.826 33.6721 159.826 33.6721C160.301 33.6721 165.405 34.3835 165.049 37.4662C164.693 40.5489 159.944 39.1261 159.944 39.1261C161.606 40.4303 161.131 43.9873 158.282 44.5801C155.433 45.1729 154.127 40.5489 154.127 40.5489C154.127 42.0902 156.739 46.7143 156.739 46.7143L162.556 46.24C159.944 48.8484 156.62 54.0653 153.89 56.5552L162.319 51.8126C159.826 54.5396 157.451 57.3851 154.958 60.2307L162.793 56.3181C160.063 59.6379 156.739 62.8391 153.415 66.3961C156.739 64.2619 160.301 63.6691 162.793 62.7206L152.109 76.4742C155.789 75.4071 157.333 78.3712 157.808 79.6754C158.282 80.9797 158.164 82.4024 158.164 83.8252C157.808 89.7535 156.62 95.6818 154.246 101.136C153.178 103.507 150.091 106.708 144.868 108.724C144.868 108.724 145.343 114.297 144.749 119.632C143.918 128.643 137.508 132.437 137.508 132.437C142.731 141.804 160.301 154.846 173.953 161.486C185.349 167.058 200.307 173.105 202.919 187.214C203.75 191.838 202.681 196.581 202.206 201.205C201.613 206.422 201.019 211.52 200.307 216.618C199.001 226.697 191.997 267.72 191.166 270.447C190.81 271.87 190.216 272.937 189.385 274.123C188.317 275.783 184.043 305.661 184.281 305.898C184.637 306.372 186.061 308.744 186.18 310.522C186.536 314.553 185.468 319.889 185.586 323.09C185.824 328.307 188.079 332.22 188.079 332.22C188.792 335.421 189.623 338.741 190.216 341.942L191.403 349.175C192.591 354.866 188.91 356.17 188.792 357.593C188.317 363.165 196.627 681.158 197.339 713.526"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M128.96 41.1421C128.248 42.2092 128.248 43.632 128.604 44.9362C128.96 46.2404 129.791 47.3075 130.741 48.256C131.334 48.9674 132.284 49.5602 133.115 49.3231C133.946 49.086 134.302 48.0189 134.421 47.1889C134.54 46.2404 134.421 45.0547 133.709 44.4619C133.946 45.0547 134.658 45.1733 135.371 45.2919C136.083 45.4104 136.914 45.4104 137.626 45.529C138.101 45.529 138.576 45.6476 139.051 45.4104C139.407 45.1733 139.644 44.6991 139.763 44.2248C139.882 43.5134 139.882 42.6834 139.407 41.972C138.932 41.3792 137.982 41.1421 137.389 41.4978"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M71.7401 54.8956C71.6214 55.8441 71.5027 56.9112 71.2652 57.8597C71.1465 58.5711 71.0278 59.2825 70.6717 59.7567C70.1968 60.4681 69.2471 60.7053 68.4161 60.5867C67.5851 60.4681 66.8728 59.8753 66.398 59.1639C65.4483 57.6226 65.6857 55.4884 66.9915 54.3027"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M121.243 45.8848C121.243 45.8848 124.805 50.0346 121.6 53.1173C118.394 56.2 115.426 48.8489 115.426 48.8489C115.426 48.8489 117.207 55.1329 113.646 56.0814C110.084 57.0299 109.372 49.916 109.372 49.916"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M96.1951 38.6523C96.1951 38.6523 90.7343 41.3793 92.6337 45.1734C94.5331 48.9675 99.2816 42.3279 99.2816 40.4308"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M87.0545 46.5962C87.0545 46.5962 82.4247 47.9004 82.6621 51.5759C82.8996 55.2515 87.0546 55.6072 90.4972 51.8131C90.4972 51.8131 87.8855 56.0814 91.3282 57.7413C94.7709 59.5198 96.0768 51.1017 96.0768 51.1017C96.0768 51.1017 93.1089 59.9941 97.8575 60.3498C102.606 60.7055 102.012 52.9987 102.012 52.9987"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M81.4746 26.0847C81.4746 26.0847 77.4383 20.7492 80.5248 18.6151C83.6114 16.4809 85.2734 23.9505 85.2734 23.9505C85.2734 23.9505 84.7985 17.0737 87.7663 18.1408C90.7342 19.0893 89.6658 23.5948 89.4283 24.899"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M91.9209 22.7646C91.9209 22.7646 90.7338 16.7178 94.0578 17.192C97.3818 17.5477 96.4321 22.0532 96.4321 22.0532C96.4321 22.0532 101.181 20.749 101.774 27.8629C101.774 27.8629 101.418 20.749 105.454 22.2903C109.372 23.8317 105.692 29.5228 105.692 29.5228"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M123.499 27.9814C123.499 27.9814 122.074 21.5789 125.398 21.6974C128.722 21.816 127.06 28.5742 127.06 28.4557C127.06 28.3371 127.179 21.4603 131.69 22.0531C136.082 22.7645 131.096 29.2856 131.096 29.2856"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M139.05 29.8788C139.05 29.8788 137.863 22.4092 142.731 22.5278C147.598 22.6463 143.324 30.3531 143.324 30.3531C143.324 30.3531 146.055 23.7134 149.853 25.4919C153.533 27.2704 149.022 32.7244 147.004 33.6729"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M125.043 78.6086C128.842 79.9128 133.234 79.6757 136.914 78.1343C137.389 77.8972 137.864 77.7786 138.101 77.4229C138.814 76.593 138.695 75.2887 138.22 74.2217C137.389 72.5617 135.727 71.3761 134.065 70.6647C132.284 69.9533 130.504 69.8347 128.604 69.5976C126.942 69.479 125.28 69.479 123.737 69.9533C122.194 70.4276 120.651 71.3761 119.938 72.9174C118.039 76.9487 122.313 77.7786 125.043 78.6086Z"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M93.9401 76.9489C94.4149 76.7118 94.8898 76.4747 95.1272 76.119C95.4833 75.6447 95.3646 74.9333 95.2459 74.3405C95.0085 72.7992 94.6523 71.0207 93.3465 70.0721C92.2781 69.3608 90.9722 69.2422 89.6664 69.2422C88.3605 69.2422 87.0547 69.2422 85.7488 69.2422C84.6804 69.2422 83.612 69.2422 82.5436 69.4793C80.288 69.9536 78.3886 71.2578 76.7266 72.7991C76.2518 73.2734 75.7769 73.7477 75.6582 74.4591C75.6582 75.0519 75.8956 75.6447 76.2518 76.119C80.288 81.0987 89.0728 79.0831 93.9401 76.9489Z"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M137.745 90.7024C131.572 88.4497 124.687 88.3311 118.514 90.4653"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M95.1272 90.4654C92.9904 89.8726 90.7348 89.6354 88.598 89.3983C84.2056 88.9241 79.6945 88.4498 75.6582 90.3468C75.7769 90.2283 76.0143 90.2283 76.133 90.1097"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M114.833 110.029C113.409 111.452 109.61 115.009 107.473 115.364C105.93 115.601 104.149 114.416 103.081 113.349C101.894 112.163 100.469 110.859 99.9942 109.317C99.8755 108.962 99.9942 108.369 99.9942 108.013C99.9942 107.065 99.9942 106.116 100.113 105.049C100.232 102.203 100.35 99.3579 100.469 96.5124C100.588 94.1411 100.706 91.7697 100.825 89.2799C100.944 86.5529 100.944 83.7073 101.894 81.2174C102.725 79.0832 102.368 76.5934 100.232 75.4077"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M116.021 124.019C115.071 118.802 112.697 117.38 112.104 113.111"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M122.431 122.715C121.006 119.751 121.6 116.431 114.121 110.977"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M109.135 114.89C110.203 118.091 110.441 121.648 110.678 125.086"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M105.336 115.246C105.336 118.803 105.218 122.715 104.387 126.154"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M102.012 112.637C101.656 114.179 100.588 116.431 99.8754 117.736C98.9257 119.514 97.7385 121.292 97.2637 123.19"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M99.6387 109.792C98.3328 110.977 93.9404 112.044 92.041 118.447"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M144.749 87.0267C145.58 84.4183 147.954 82.2841 149.735 80.1499"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M160.657 23.0015C159.114 22.7643 157.452 22.7643 155.909 23.2386C155.79 23.3572 155.909 23.4757 156.027 23.4757C156.146 23.4757 156.146 23.3572 156.146 23.2386"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M159.47 20.393C157.808 20.0373 155.909 20.2744 154.484 21.1044"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M75.7773 388.183C78.7452 390.436 86.8177 395.178 91.5663 395.297C106.287 395.653 177.515 357.949 191.523 349.293"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M143.681 102.678C143.562 95.6825 144.631 88.6872 145.462 81.8104C146.293 75.2893 146.53 68.8867 146.649 62.2471"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M135.015 135.283C131.81 148.681 126.349 161.486 119.107 173.224C112.578 183.895 101.419 193.735 103.2 207.489C102.606 203.339 108.304 196.818 110.679 193.735C113.765 189.586 118.632 182.116 123.144 179.389C124.568 181.168 133.59 193.617 134.184 193.973C136.202 195.04 154.484 164.687 157.689 153.068C157.689 152.83 157.808 152.593 157.57 152.475C157.333 152.356 157.452 152.83 157.57 152.712"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M182.857 181.049C181.195 182.116 167.424 187.452 166.83 188.4C164.931 191.839 161.726 206.422 161.369 207.489C161.369 207.489 164.812 210.335 165.05 211.046C165.762 213.062 161.251 217.805 160.538 218.042C158.046 218.635 150.567 218.397 146.768 217.923C146.768 217.923 143.919 214.84 140.595 211.758C141.9 212.232 146.649 218.872 147.243 220.057C149.142 223.614 156.621 241.399 155.434 245.905C154.722 248.394 148.667 251.951 146.649 253.256C144.156 255.034 142.494 253.967 140.595 251.121C137.627 246.616 136.44 245.075 137.627 242.822C138.933 240.332 144.868 237.368 146.649 236.182"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M140.713 251.121C140.713 251.121 139.764 267.483 138.814 269.973C137.864 272.463 136.915 274.36 132.285 274.004C127.536 273.649 126.349 272.345 125.993 267.958C125.637 263.571 123.619 238.791 123.737 238.791"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M126.23 270.685C126.23 270.685 126.23 273.175 124.33 274.36C122.431 275.546 116.851 274.123 114.952 272.345C112.934 270.566 112.459 248.039 112.459 244.956"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M114.002 270.092C114.002 270.092 113.527 272.582 111.747 272.226C109.966 271.871 101.3 265.35 100.231 262.623C99.5192 260.844 101.181 238.317 101.3 235.945"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M100.232 261.911C100.232 261.911 94.2964 270.21 91.3286 271.752C89.6666 272.582 88.242 271.515 88.242 271.515C88.242 271.515 88.8356 273.53 85.0368 273.886C80.7631 274.36 76.8455 274.479 75.8958 272.226C75.8958 272.226 75.6584 274.36 70.3163 272.7C65.449 271.159 62.2437 271.04 62.125 263.927C62.0063 256.694 62.125 247.802 62.125 247.802C62.125 247.802 61.4128 249.936 59.1572 250.173C56.7829 250.41 50.0163 246.972 48.1169 243.652C47.1672 241.992 50.4911 235.827 53.2215 229.424C55.8332 223.377 57.7327 217.093 57.7327 217.093C57.8514 216.619 61.5315 211.402 63.0748 209.861C64.618 208.319 67.2297 208.438 67.5859 208.319"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M90.8539 244.482C90.8539 244.482 89.4293 267.602 88.2422 271.396"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M78.9821 238.198C78.9821 238.198 77.2014 267.128 75.8955 272.107"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M57.8506 234.641C58.088 234.759 64.2611 239.028 65.567 240.806C66.2792 241.755 63.3114 245.904 62.0056 247.683"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M67.3477 245.193C67.3477 245.193 72.0962 244.007 74.7079 245.43"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M65.2109 260.251C65.2109 260.251 70.1969 259.54 73.046 260.844"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M137.033 261.437C134.896 261.2 132.759 261.2 130.622 261.555C130.147 261.674 129.673 261.792 129.316 262.03"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M123.025 261.437C122.906 261.199 118.87 260.962 116.852 262.029"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M116.734 205.355C116.734 205.355 120.058 207.608 119.701 210.69C119.345 213.773 118.514 214.01 118.514 214.01C118.514 214.01 123.975 216.263 124.687 220.057C125.4 223.851 120.176 229.78 112.104 229.542C112.104 229.542 107.355 235.352 100.47 234.878C93.5844 234.404 90.9727 231.558 90.023 227.764C90.023 227.764 78.7452 229.78 76.9645 223.97C75.1838 218.042 77.0833 216.144 79.6949 214.485C79.6949 214.485 73.9967 207.845 79.9324 203.221C85.868 198.597 92.7534 201.561 94.8903 203.221C97.0271 204.881 96.5523 207.489 96.5523 207.489C96.5523 207.489 99.5201 206.659 102.251 207.489C102.251 207.489 107.474 202.391 116.734 205.355Z"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M102.25 207.489C102.25 207.489 101.063 213.18 102.962 215.196C105.455 217.923 110.441 219.82 118.514 214.01"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M102.963 215.196C102.963 215.196 100.588 215.552 98.6889 213.892C96.7895 212.232 93.7029 213.418 93.7029 213.418C93.7029 213.418 85.1556 210.691 79.8135 214.485"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M97.0264 218.753C97.0264 218.753 102.725 217.805 106.642 219.465C111.509 221.48 112.103 224.681 112.222 229.543"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M78.8633 220.65C78.8633 220.65 81.9498 217.449 85.2738 219.109C88.8352 220.887 88.8352 221.599 91.5656 221.717"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M93.1094 227.29C93.1094 227.29 97.5018 224.207 101.419 226.46C105.337 228.831 108.423 226.578 109.848 225.63"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M111.153 223.496C111.153 223.496 113.884 222.666 116.377 223.021C118.87 223.377 120.888 221.361 122.194 219.464"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M104.624 212.232C104.624 212.232 106.761 209.031 110.441 210.453C114.121 211.758 116.139 210.453 117.801 208.912"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M96.5512 207.489C96.5512 207.489 96.9073 211.046 93.702 213.418C93.702 213.418 96.9073 216.145 97.026 218.753C97.026 218.753 92.0401 220.057 91.0904 222.547C90.2594 224.918 90.1406 227.883 90.1406 227.883"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M96.4326 22.0532C96.4326 22.0532 93.4648 24.5431 97.1449 28.5743"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M8.82208 85.1299C8.82208 85.1299 9.65308 94.8522 11.9086 97.6978C14.0455 100.306 16.8946 100.899 16.8946 100.899C16.8946 100.899 12.7396 101.729 11.1963 104.812C10.0092 107.183 8.70337 114.416 8.82208 116.668C8.82208 116.668 7.51625 105.879 5.61684 104.1C3.71742 102.322 0.630859 100.425 0.630859 100.425C0.630859 100.425 4.54839 100.306 6.32909 96.3936C7.87237 93.0738 7.99109 91.5324 8.82208 85.1299Z"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M78.9826 137.062C78.9826 137.062 86.1054 163.264 92.041 171.801C97.9767 180.338 103.794 189.705 104.15 190.297C104.862 191.364 104.862 194.329 103.912 198.241C103.912 198.241 93.4656 182.116 88.7171 178.915C87.0551 177.848 75.896 194.091 75.896 194.091L57.0206 156.862L54.0527 149.155"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M138.221 112.993C138.221 113.348 137.627 132.437 137.627 132.437L131.454 137.773C131.454 137.773 122.313 153.423 105.099 151.052C87.5299 148.681 76.8457 132.082 76.8457 132.082"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M133.116 119.751L131.335 137.773"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M124.687 124.494C124.687 124.494 124.093 142.278 122.906 146.547"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M117.564 128.525C117.564 128.525 117.446 145.954 115.902 149.985"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M110.56 128.644C110.56 128.644 110.085 148.563 109.254 151.171"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M104.506 129.473L104.269 150.696"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M97.502 125.798C97.502 125.798 97.7394 148.918 97.8581 149.037"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M89.666 119.514L90.1409 145.124"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M81.8311 114.534L82.6621 139.196"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M75.1833 110.621L74.8271 130.896"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M161.369 207.489C161.132 207.845 152.466 198.123 150.092 195.277C147.599 192.431 132.878 195.277 132.641 195.396C131.216 196.107 130.385 196.225 125.755 199.071C123.381 200.494 119.82 202.865 117.208 205.592"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M124.806 220.65C124.806 220.65 130.86 226.222 141.782 223.97"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M61.7686 225.63C61.8873 225.63 67.8229 227.29 72.2153 224.326"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M57.7324 216.619C57.7324 216.619 50.1347 219.346 42.2996 216.501C42.2996 216.501 38.3821 214.011 37.9072 210.454C37.9072 210.454 52.9838 195.04 57.1388 192.313C61.2938 189.586 64.3803 191.009 67.9418 193.262L82.1874 201.561"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M16.4199 176.188C16.4199 176.188 37.0761 186.74 39.569 188.282C42.062 189.823 45.0299 203.221 45.0299 203.221"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M42.2995 216.5C42.2995 216.5 26.748 225.274 24.3737 228.238C21.8807 231.202 18.3193 253.492 18.3193 253.492"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M10.2471 236.893C10.2471 236.893 17.3699 228.238 19.0319 226.815C20.6938 225.392 24.2552 228.356 24.2552 228.356"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M62.2432 265.468C62.2432 265.468 54.5268 274.953 38.5005 277.443C23.4239 279.814 16.6572 272.226 16.6572 272.226"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M189.505 274.242C189.505 274.242 170.273 283.845 163.981 283.253C157.808 282.66 139.289 265.468 139.289 265.468"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M130.612 312.048C133.63 308.859 132.794 303.175 128.744 299.351C124.694 295.527 118.965 295.012 115.947 298.2C112.929 301.389 113.765 307.073 117.815 310.897C121.865 314.721 127.595 315.236 130.612 312.048Z"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M118.395 299.14C118.395 299.14 118.869 303.409 122.787 304.831C126.586 306.254 128.129 307.084 128.485 310.167"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M83.2265 303.41C87.8815 300.35 89.6973 294.899 87.2822 291.234C84.867 287.569 79.1355 287.079 74.4805 290.139C69.8254 293.199 68.0096 298.651 70.4248 302.316C72.8399 305.98 78.5714 306.47 83.2265 303.41Z"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M84.6804 291.908C84.6804 291.908 83.4932 296.057 79.457 296.769C75.4207 297.48 73.8774 298.073 72.9277 301.037"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M17.8447 302.697L26.1547 292.026"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M176.208 293.923C176.208 294.042 184.281 305.898 184.281 305.898"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M185.587 324.514C185.587 324.514 166.355 332.695 146.174 341.943C124.805 351.784 101.894 364.589 94.2959 363.522C93.7023 363.403 86.6982 361.269 86.6982 361.269"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M17.2133 330.797C18.994 332.576 70.6343 355.103 72.415 355.696"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M97.0263 340.875C97.0263 340.875 97.5012 342.654 97.2637 343.958C97.0263 345.262 94.7708 346.804 94.7708 348.938C94.7708 351.072 94.2959 363.521 94.2959 363.521"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M92.0408 345.855L83.8496 341.231"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M82.6621 344.077L90.7346 348.819"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M76.4893 353.325C76.4893 353.325 79.5758 357.83 86.1051 357.83"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M86.1044 367.789C86.1044 367.789 65.4483 411.421 54.0518 417.587C46.8103 421.5 41.112 419.84 36.6009 416.401C26.629 408.694 24.6108 404.308 23.8986 401.106C23.1863 397.905 20.4559 378.697 23.4237 376.8C27.5787 374.073 29.953 377.749 29.953 377.749C29.953 377.749 40.6372 395.297 42.774 395.889C44.7921 396.482 46.6915 393.637 46.6915 393.637C46.6915 393.637 64.3798 363.877 66.8728 360.794C67.8225 359.608 68.6535 358.66 69.3658 357.83C70.4342 356.644 71.9775 355.814 73.5208 355.34C75.064 354.984 76.4886 354.036 78.388 350.953C80.6436 347.396 84.5611 340.282 85.867 337.081C86.2231 336.132 86.1044 335.065 85.3921 334.354C84.6798 333.524 82.7804 333.05 81.4746 332.101C79.3377 330.441 82.6617 325.343 90.1407 326.884C98.0945 328.663 105.217 334.947 103.674 340.756C102.368 345.499 98.8067 341.705 96.4325 340.282C95.8389 339.927 95.0079 340.519 94.6518 341.112C94.0582 342.416 92.3962 345.736 90.6155 348.819C88.9535 351.783 85.7483 355.933 86.2231 358.304C86.3418 358.304 87.529 365.418 86.1044 367.789ZM86.1044 367.789C86.1044 367.789 89.9032 368.856 91.8026 369.686C94.1769 370.754 98.2132 370.279 100.587 369.449C128.129 359.964 159.944 344.195 186.892 329.73"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M65.8857 361.031C63.5115 359.846 62.9179 360.439 15.4325 336.726"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M84.6805 370.517C84.6805 370.517 86.8173 371.466 87.6483 372.77C88.4793 374.074 85.0366 382.611 82.0688 385.693C79.101 388.776 77.6764 387.353 76.4893 386.405"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M65.8044 361.98C65.567 361.98 63.5489 360.675 62.1243 360.913C60.8184 361.15 55.5951 371.939 55.1202 373.955C54.6454 375.97 57.2571 375.733 57.2571 375.733"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M64.6172 363.64L83.3739 373.363"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M62.7188 366.841L81.3568 377.275"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M60.3438 370.635C60.3438 370.635 79.3379 380.832 79.3379 380.95"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M58.5635 373.836L77.0828 384.982"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M45.623 394.704C45.623 394.704 57.6131 414.505 57.7318 414.386"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M42.6556 395.89L36.2451 416.046"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M33.9895 384.507L22.1182 388.894"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M36.1267 387.472L22.4746 393.044"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M188.792 357.712C188.792 357.712 100.588 405.138 91.0913 402.648C81.5942 400.158 72.2158 393.993 72.2158 393.993"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M52.2714 384.152L16.4199 368.738"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
          <path
            className="man-svg-path"
            d="M55.4772 378.698L13.5713 358.897"
            stroke="#FEFCF7"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            // style="stroke-dashoffset: 0; stroke-dasharray: none;"
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default Handpicked;
