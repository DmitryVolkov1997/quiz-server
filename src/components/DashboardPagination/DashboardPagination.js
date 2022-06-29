import styled from 'styled-components';

const GroupButton = styled.div`
  display: flex;
  margin-top: 2rem;
  overflow-x: auto;
  max-width: 400px;
  gap: .2rem;
`

const Button = styled.button`
  color: #fff;
  cursor: pointer;
  padding: .7rem 1rem;
  font-family: var(--family);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--colors-text);
  border: 2px solid rgb(226,232,240);
  background-color: transparent;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  
  &:focus {
    border-color: rgb(49,130,206);
  }
`
const DashboardPagination = ({dataPerPage, totalData, paginate}) => {
    const pagesNumbers = []

    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pagesNumbers.push(i)
    }

    return (
      <GroupButton>
          {
              pagesNumbers.map((number) => {
                  return (
                    <Button key={number} onClick={() => paginate(number)}>{number}</Button>
                  )
              })
          }
      </GroupButton>
    );
};

export default DashboardPagination;
