import React, { useState } from "react";
import styled from "styled-components";
import { ICartItem } from "../types";

interface IHeaderProps {
  cart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

const Header: React.FC<IHeaderProps> = ({ cart, setCart }) => {
  const [toggle, setToggle] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const deleteItem = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const cartItemCount = cart.reduce((acc: number, item: ICartItem) => {
    acc += item.quantity;
    return acc;
  }, 0);

  return (
    <HeaderWrapper>
      <StyledHeader>
        <StyledDiv>
          <BurgerImg
            src="/images/icon-menu.svg"
            onClick={() => {
              setToggle(true);
            }}
          ></BurgerImg>

          <Logo src="/images/logo.svg"></Logo>
          <Burger $toggle={toggle}>
            <CrossImg
              src="/images/icon-close.svg"
              onClick={() => {
                setToggle(false);
              }}
            ></CrossImg>
            <StyledList>
              <StyledListItem>Collections</StyledListItem>
              <StyledListItem>Men</StyledListItem>
              <StyledListItem>Women</StyledListItem>
              <StyledListItem>About</StyledListItem>
              <StyledListItem>Contact</StyledListItem>
            </StyledList>
          </Burger>
        </StyledDiv>
        <StyledDivProfile>
          {cartItemCount > 0 ? (
            <ItemCountContainer>
              <ItemCountSpan>{cartItemCount}</ItemCountSpan>
            </ItemCountContainer>
          ) : null}

          <CartImg
            src="/images/icon-cart.svg"
            onClick={() => setShowCart(!showCart)}
          />
          <Cart $show={showCart}>
            <CartHeader>Cart</CartHeader>
            <CartBody>
              {" "}
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <CartItem key={item.product.id}>
                      <CartItemImg src={item.product.images[0]} />
                      <ItemInfo>
                        <ItemName>{item.product.productTitle}</ItemName>
                        <ItemPrice>
                          {`$${(
                            item.product.price *
                            (item.product.salePercentage / 100)
                          ).toFixed(2)} x ${item.quantity} `}
                          <span>{`$${(
                            item.product.price *
                            (item.product.salePercentage / 100) *
                            item.quantity
                          ).toFixed(2)}`}</span>
                        </ItemPrice>
                      </ItemInfo>
                      <DeleteIcon
                        src="/images/icon-delete.svg"
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      />
                    </CartItem>
                  ))}
                  <Checkout
                    onClick={() => {
                      setCart([]);
                    }}
                  >
                    Checkout
                  </Checkout>
                </>
              ) : (
                <Empty>Your cart is empty.</Empty>
              )}
            </CartBody>
          </Cart>
          <ProfileImg src="/images/image-avatar.png"></ProfileImg>
        </StyledDivProfile>
      </StyledHeader>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.div`
  width: 100%;
  max-height: 11.2rem;
  display: flex;
  justify-content: space-between;
  padding: 2rem 2.4rem 2.6rem;
  position: relative;
  max-width: 50.03rem;
  @media only screen and (min-width: 768px) {
    margin-bottom: 9rem;
    max-width: 111rem;
    border-bottom: solid 1px #e4e9f2;
    padding: 2rem 2.4rem 2.6rem;
  }
`;

const BurgerImg = styled.img`
  &:hover {
    cursor: pointer;
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;
const Burger = styled.div<{ $toggle: boolean }>`
  height: 100vh;
  position: fixed;
  left: ${(props) => (props.$toggle ? "0" : "-250px")};
  top: 0;
  background-color: #fff;
  width: 25rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 0 0 2.4rem;
  gap: 5.3rem;
  transition: 0.3s ease-in;
  &::before {
    content: "";
    display: ${(props) => (props.$toggle ? "block" : "none")};
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 25rem;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      20% {
        opacity: 0.1;
      }
      40% {
        opacity: 0.2;
      }
      60% {
        opacity: 0.3;
      }

      80% {
        opacity: 0.4;
      }

      100% {
        opacity: 0.5;
      }
    }

    @media only screen and (min-width: 768px) {
      display: none;
    }

    z-index: 100;
  }

  @media only screen and (min-width: 768px) {
    position: static;
    z-index: 1;
    flex-direction: row;
    padding: 0;
    width: fit-content;
    height: fit-content;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media only screen and (min-width: 768px) {
    position: static;
    z-index: 1;
    flex-direction: row;
  }
`;

const StyledListItem = styled.li`
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1.44;
  color: #1d2026;

  @media only screen and (min-width: 768px) {
    padding: 4.1rem 0 4.5rem;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.73;
    position: relative;
    color: #69707d;
    &:hover {
      cursor: pointer;
      color: #1d2026;
    }

    &:hover::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.4rem;
      background-color: #ff7e1b;
    }
  }
`;

const CrossImg = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const CartImg = styled.img`
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    width: 5rem;
    height: 5rem;
    border: solid 2px #ff7e1b;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  @media only screen and (min-width: 768px) {
    gap: 5.6rem;
  }
`;

const StyledDivProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  position: relative;
`;
const Cart = styled.div<{ $show: boolean }>`
  position: absolute;
  background-color: #fff;
  width: 36rem;
  min-height: 25.6rem;
  z-index: 1000;
  bottom: -29rem;
  left: -27.5rem;
  border-radius: 10px;
  box-shadow: 0 20px 50px -20px rgba(29, 32, 38, 0.5);
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-direction: column;
`;

const ItemCountContainer = styled.div`
  width: 1.9rem;
  height: 1.3rem;
  padding: 0.15rem 0.6rem 0.15rem;
  background-color: #ff7e1b;
  border-radius: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -0.4rem;
  left: 0.9rem;

  @media only screen and (min-width: 768px) {
    top: 41%;
    transform: translateY(-50%);
  }
`;

const ItemCountSpan = styled.span`
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

const CartHeader = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: #1d2026;
  padding: 2.4rem 0 2.7rem 2.4rem;
  border-bottom: solid 1px #e4e9f2;
`;

const CartBody = styled.div`
  flex: 1;
  padding: 2.4rem 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Empty = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.63;
  color: #69707d;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const CartItemImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ItemName = styled.p`
  font-size: 1.6rem;
  line-height: 1.63;
  color: #69707d;
`;

const ItemPrice = styled(ItemName)`
  span {
    color: #1d2026;
    font-weight: bold;
  }
`;

const DeleteIcon = styled.img`
  align-self: center;
  cursor: pointer;
`;

const Checkout = styled.button`
  all: unset;
  font-family: inherit;
  font-size: 1.6rem;
  text-align: center;
  padding: 2.2rem 0 1.8rem;
  width: 100%;
  border-radius: 10px;
  background-color: #ff7e1b;
  color: #fff;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    background-color: #ffab6a;
  }
`;

export default Header;
