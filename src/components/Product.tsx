import React, { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import { useMask } from "@react-input/mask";
import { IProduct, ICartItem } from "../types";

interface IProdcutProps {
  product: IProduct;
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  cart: ICartItem[];
}

const Product: React.FC<IProdcutProps> = ({ product, cart, setCart }) => {
  const slideAmount = 4;
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [value, setValue] = useState<number>(0);
  const ref = useMask({
    mask: "_____",
    replacement: { _: /[0-9]/ },
  });

  const [mainImage, setMainImage] = useState<string>(product.images[0]);

  const [showPopUp, setShowPopUp] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slideAmount - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(slideAmount - 1);
    }
  };

  const addToCart = () => {
    if (!cart.some((item: ICartItem) => item.product.id === product.id)) {
      if (value > 0) {
        setCart([...cart, { id: Math.random(), product, quantity: value }]);
        setValue(0);
      }
    }
  };
  return (
    <StyledProduct>
      <CarouselContainer>
        <CarouselWrapper>
          <MainImage
            src={mainImage}
            onClick={() => {
              setShowPopUp(true);
            }}
          />

          <Carousel $currentSlide={currentSlide}>
            {product.images.map((image: string) => {
              return (
                <CarouselItem
                  key={image}
                  $active={mainImage == image}
                  onClick={() => {
                    setMainImage(image);
                  }}
                >
                  <CarouselImg src={image} />
                </CarouselItem>
              );
            })}
          </Carousel>
        </CarouselWrapper>

        <ArrowsContainer>
          <Arrow
            onClick={() => {
              prevSlide();
            }}
          >
            <svg
              style={{ transform: "rotate(180deg)", borderRadius: "50%" }}
              width="13"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m2 1 8 8-8 8"
                stroke="#1D2026"
                stroke-width="3"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
          </Arrow>
          <Arrow
            onClick={() => {
              nextSlide();
            }}
          >
            <svg
              style={{ borderRadius: "50%" }}
              width="13"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m2 1 8 8-8 8"
                stroke="#1D2026"
                stroke-width="3"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
          </Arrow>
        </ArrowsContainer>
      </CarouselContainer>

      <ProductInfo>
        <CompanyTitle>{product.companyTitle.toUpperCase()}</CompanyTitle>
        <ProductTitle>{product.productTitle}</ProductTitle>
        <ProductDescription>{product.productDescription}</ProductDescription>
        <PriceWrapper>
          <DiscountWrapper>
            <DiscountedPrice>{`$${
              product.price * (product.salePercentage / 100)
            }`}</DiscountedPrice>
            <DiscountContainer>{`${product.salePercentage}%`}</DiscountContainer>
          </DiscountWrapper>
          <OriginalPrice>{`$${product.price}`}</OriginalPrice>
        </PriceWrapper>

        <AddWrapper>
          <StyledInputWrapper>
            <StyledInput
              ref={ref}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setValue(parseInt(event.target.value))
              }
              value={value}
              placeholder="0"
            />
            <StyledMinus
              src="/images/icon-minus.svg"
              onClick={() => {
                if (value > 0) setValue(value - 1);
              }}
            />
            <StyledPlus
              src="/images/icon-plus.svg"
              onClick={() => {
                setValue(value + 1);
              }}
            />
          </StyledInputWrapper>
          <AddToCart onClick={addToCart}>
            <ButtonWraper>
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#fff"
                  fill-rule="nonzero"
                />
              </svg>
              <ButtonText>Add to cart</ButtonText>
            </ButtonWraper>
          </AddToCart>
        </AddWrapper>
      </ProductInfo>

      <PopUpCarousel $showPopUp={showPopUp}>
        <PopCarouselContainer>
          <PopCarouselWrapper>
            <StyledSvg
              width="14"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setShowPopUp(false)}
            >
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill="#fff"
                fill-rule="evenodd"
              />
            </StyledSvg>
            <PopMainImage src={mainImage} />

            <Carousel $currentSlide={currentSlide}>
              {product.images.map((image: string) => {
                return (
                  <CarouselItem
                    $active={mainImage == image}
                    onClick={() => {
                      setMainImage(image);
                    }}
                  >
                    <CarouselImg src={image} />
                  </CarouselItem>
                );
              })}
            </Carousel>
          </PopCarouselWrapper>

          <PopArrowContainer>
            <Arrow
              onClick={() => {
                setMainImage(() => {
                  const currentIndex = product.images.findIndex(
                    (image) => image == mainImage
                  );
                  let newIndex;
                  if (currentIndex > 0) {
                    newIndex = currentIndex - 1;
                  } else {
                    newIndex = product.images.length - 1;
                  }
                  return product.images[newIndex];
                });
              }}
            >
              <svg
                style={{ transform: "rotate(180deg)", borderRadius: "50%" }}
                width="13"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m2 1 8 8-8 8"
                  stroke="#1D2026"
                  stroke-width="3"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </Arrow>
            <Arrow
              onClick={() => {
                setMainImage(() => {
                  const currentIndex = product.images.findIndex(
                    (image) => image == mainImage
                  );
                  let newIndex;
                  if (currentIndex < product.images.length - 1) {
                    newIndex = currentIndex + 1;
                  } else {
                    newIndex = 0;
                  }
                  return product.images[newIndex];
                });
              }}
            >
              <svg
                style={{ borderRadius: "50%" }}
                width="13"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m2 1 8 8-8 8"
                  stroke="#1D2026"
                  stroke-width="3"
                  fill="none"
                  fill-rule="evenodd"
                />
              </svg>
            </Arrow>
          </PopArrowContainer>
        </PopCarouselContainer>
      </PopUpCarousel>
    </StyledProduct>
  );
};

const StyledProduct = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;

  @media only screen and (min-width: 1220px) {
    flex-direction: row;
    justify-content: center;
    padding-bottom: 13rem;
    gap: 12.5rem;

    max-width: 111rem;
    margin: auto;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 60rem;
`;

const CarouselWrapper = styled.div`
  max-width: 44.5rem;
  overflow: hidden;
  display: block;

  @media only screen and (min-width: 1220px) {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
`;

const PopCarouselWrapper = styled(CarouselWrapper)`
  max-width: 55rem;
  align-items: center;
  overflow: show;
`;

const Carousel = styled.div<{ $currentSlide: number }>`
  display: flex;

  transform: ${(props) => `translateX(-${props.$currentSlide * 100}%)`};
  transition: 0.5s ease-in-out;

  @media only screen and (min-width: 1220px) {
    transform: translateX(-0);

    gap: 3rem;
  }
`;

// const PopCarousel = styled(Carousel)`
//   @media only screen and (min-width: 90rem) {
//     transform: ${(props) => `translateX(-${props.$currentSlide * 100}%)`};
//     gap: 3rem;
//   }
// `;

const MainImage = styled.img`
  display: none;

  @media only screen and (min-width: 1220px) {
    display: block;
    width: 44.5rem;
    border-radius: 15px;
  }
`;

const PopMainImage = styled(MainImage)`
  max-width: 55rem;
  width: 55rem;
  border-radius: 0;
`;

const CarouselItem = styled.div<{ $active: boolean }>`
  min-width: 100%;
  max-width: 100%;

  min-height: 30rem;
  position: relative;
  overflow-y: hidden;
  @media only screen and (min-width: 1220px) {
    border-radius: 15px;
    min-width: 8.8rem;
    min-height: 8.8rem;
    width: 8.8rem;
    overflow-y: show;
    border: ${(props) => (props.$active ? "solid 2px #ff7e1b" : "")};

    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.75);
      pointer-events: none;
      display: ${(props) => (props.$active ? "block" : "none")};
    }

    &:hover::before {
      display: block;
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const CarouselImg = styled.img`
  width: 100%;
  /* object-position: top; */
`;

const ArrowsContainer = styled.div`
  width: 100%;
  max-width: 70rem;
  padding: 0 2.4rem;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;

  @media only screen and (min-width: 44.5rem) {
  }
  @media only screen and (min-width: 1220px) {
    display: none;
  }
`;

const Arrow = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media only screen and (min-width: 1220px) {
    width: 5.6rem;
    height: 5.6rem;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.4rem 2.4rem 8rem;
  max-width: 44.5rem;

  @media only screen and (min-width: 1220px) {
    padding: 0;
    padding-right: 4.7rem;
  }
`;

const CompanyTitle = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1.85px;
  color: #ff7e1b;
  margin-bottom: 0.4rem;

  @media only screen and (min-width: 1220px) {
    font-size: 1.3rem;
    letter-spacing: 2px;
    margin-bottom: 1.2rem;
  }
`;

const ProductTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  line-height: 1.14;
  color: #1d2026;

  @media only screen and (min-width: 1220px) {
    font-size: 4.4rem;
    line-height: 1.09;
    margin-bottom: 1.7rem;
  }
`;

const ProductDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.67;
  color: #69707d;
  margin-bottom: 1.3rem;
  @media only screen and (min-width: 1220px) {
    font-size: 1.6rem;
    line-height: 1.63;
    margin-bottom: 1.1rem;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (min-width: 1220px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.7rem;
  }
`;

const DiscountedPrice = styled(ProductTitle)`
  line-height: normal;
  margin: 0;

  @media only screen and (min-width: 1220px) {
    font-size: 2.8rem;
  }
`;

const DiscountContainer = styled.p`
  padding: 0.7rem 0.8rem 0.4rem;
  background-color: #ffeee2;
  color: #ff7e1b;
  border-radius: 0.6rem;
  font-size: 1.6rem;
  font-weight: bold;
  margin-left: 1.6rem;
`;

const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const OriginalPrice = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.63;
  color: #b6bcc8;
  text-decoration: line-through;
  margin-left: auto;

  @media only screen and (min-width: 1220px) {
    margin: 0;
  }
`;

const StyledInputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{ onChange: ChangeEventHandler }>`
  width: 100%;
  padding: 2.2rem 2.4rem 1.8rem;
  margin-top: 1.1rem;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  color: #1d2026;
  background-color: #f6f8fd;
  border-radius: 1rem;
  border: none;
  outline: none;

  @media only screen and (min-width: 1220px) {
    width: 15.7rem;
    padding: 2.2rem 1.6rem;
    margin: 0;
  }
`;

const StyledPlus = styled.img`
  position: absolute;
  top: 50%;
  right: 2.4rem;
  transform: translateY(-50%);
  cursor: pointer;
`;
const StyledMinus = styled.img`
  position: absolute;
  top: 50%;
  left: 2.4rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const AddToCart = styled.button`
  all: unset;
  font-family: inherit;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
  padding: 1.8rem 0;
  border-radius: 1rem;
  background-color: #ff7e1b;
  box-shadow: 0 20px 50px -20px #ff7e1b;
  cursor: pointer;
  width: 100%;

  &:hover {
  }
`;

const ButtonWraper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const ButtonText = styled.span``;

const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media only screen and (min-width: 1220px) {
    flex-direction: row;
  }
`;

const PopUpCarousel = styled.div<{ $showPopUp: boolean }>`
  display: none;
  @media only screen and (min-width: 1220px) {
    width: 100vw;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: ${(props) => (props.$showPopUp ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 2.4rem;
    padding: 9rem 0;
    z-index: 14000;
    overflow-y: auto;
  }
`;

const PopCarouselContainer = styled(CarouselContainer)`
  max-width: 55rem;
  overflow: visible;
`;

const PopArrowContainer = styled(ArrowsContainer)`
  @media only screen and (min-width: 1220px) {
    overflow: visible;
    padding: 0;
    display: flex;
    width: 60rem;
    top: 42%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StyledSvg = styled.svg`
  margin-left: auto;
  cursor: pointer;
  @media only screen and (min-width: 445px) {
    width: 2rem;
    height: 2rem;
  }
`;

export default Product;
