import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

function ModalConfirmation({
  onClose, setShowModal, reservation, title,
}) {
  const router = useRouter();

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const userStorage = JSON.parse(sessionStorage.getItem('session'));
    if (userStorage) {
      (async () => {
        try {
          const rs = await fetch(`${process.env.NEXT_PUBLIC_HOST}reservations/${reservation.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${userStorage.token}`,
            },
          });
          if (rs.status === 200) {
            setShowModal(false);
            router.replace(router.asPath);
          }
        } catch (error) {
          setShowModal(false);
        }
      })();
    }
  };

  const StyledModalTitle = styled.div`
        padding: 0;
        margin: 0;
    `;

  const StyledModalHeader = styled.div`
        width: 100%;
        padding: 0;
        margin-right: .5rem;
        display: flex;
        justify-content: flex-end;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;
        font-size: 25px;
    `;

  const StyledModal = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        width: 400px;
        height: 250px;
        border-radius: 15px;
        padding: 10px;
    `;

  const StyledModalOverlay = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    `;

  const StyledButtonsContainer = styled.div`
        padding: 1rem;
        width: 50%;
    `;

  return (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <button type="button" onClick={handleCloseClick}>x</button>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledButtonsContainer>
          <Button onClick={handleDelete}>Confirmar</Button>
          <Button onClick={handleCloseClick}>Cancelar</Button>
        </StyledButtonsContainer>
      </StyledModal>
    </StyledModalOverlay>
  );
}

ModalConfirmation.propTypes = {
  onClose: PropTypes.node.isRequired,
  setShowModal: PropTypes.node.isRequired,
  reservation: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default ModalConfirmation;
