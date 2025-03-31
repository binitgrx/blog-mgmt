import { Pagination } from "react-bootstrap";
import { DOTS, usePaginate } from "../hooks/usePaginate";
import PropTypes from "prop-types";

const Paginate = ({ currentPage, limit, setPage, setLimit, total }) => {
  let active = currentPage;
  const items = [];

  const totalNumberOfPages = Math.ceil(total / limit);

  for (let number = 1; number <= totalNumberOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        active={active === number}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationRange = usePaginate({
    currentPage,
    totalCount: total,
    pageSize: limit,
    sibling: 1,
  });

  if (currentPage === 0 || total === 0) {
    return null;
  }

  return (
    <>
      <div className="d-flex justify-content-center gap-2">
        <select
          className="form-select form-select-sm"
          style={{ height: "38px" }}
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value="">Limit</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <Pagination>
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => setPage(1)}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          />

          {paginationRange.map((number, idx) => {
            if (number === DOTS) {
              return <Pagination.Ellipsis key={`${idx}-${number}`} />;
            }
            return (
              <Pagination.Item
                key={number}
                active={currentPage === number}
                onClick={() => setPage(number)}
              >
                {number}
              </Pagination.Item>
            );
          })}

          <Pagination.Next
            disabled={currentPage === totalNumberOfPages}
            onClick={() => setPage(currentPage + 1)}
          />
          <Pagination.Last
            disabled={currentPage === totalNumberOfPages}
            onClick={() => setPage(totalNumberOfPages)}
          />
        </Pagination>
      </div>
    </>
  );
};

Paginate.propTypes = {
  currentPage: PropTypes.number,
  limit: PropTypes.number,
  setPage: PropTypes.func,
  total: PropTypes.number,
  setLimit: PropTypes.func,
};

export default Paginate;
