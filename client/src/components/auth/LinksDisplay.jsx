import {
  Icon,
  Label,
  Table,
  Menu,
  Input,
  Button,
  Pagination,
  Dimmer,
  Loader
} from "semantic-ui-react";
import Metrics from "../auth/Metrics";
import axios from "../../api/axios";
import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import ShortenURL from "../reusable/ShortenURL";
import { InputProvider } from "../hooks/InputProvider";
import LinkRow from "./LinkRow";
import { useDataContext } from "../hooks/DataProvider.jsx";
import { useAuth } from "../hooks/AuthProvider.jsx";

const LinksDisplay = (props) => {
  const { user } = useAuth();
  const { userLinks, setLinks } = useDataContext();
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = async (e, data) => {
    try {
      const response = axios.get("/dashboard", {
        headers: { "Authorization": `Bearer ${user?.accessToken}`},
        params: { page: data?.activePage},
      });
      await setLinks(response?.data);
    } catch (err) {
      setError(err?.message);
    }
  }


  const handleUrlChange = async () => {
    try {
      const response = await axios.get("/dashboard", {
        headers: { "Authorization": `Bearer ${user.accessToken}` },
        params: { page: data?.activePage },
      });
      await setLinks(response?.data);
    } catch (err) {
      console.log(err, 'err from LinksDisplay handleEditSubmit');
    }
  };

  return (
    <TableContainer>
      {/* <Metrics
        oneMonthClicks={userLinks?.oneMonthClicks || "--"}
        oneWeekClicks={userLinks?.oneWeekClicks || "--"}
      /> */}
      <Table
        singleLine
        size="small"
        compact="very"
        textAlign="center"
        verticalAlign="middle"
        selectable={true}
      >
        <Table.Header>
          <Table.Row>
            {["Title", "Original URL", "Shortened URL", "Total Clicks", ""].map(header => (
              <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userLinks?.links?.length
            ? userLinks.links.map((link) => (
                <LinkRow
                  key={JSON.stringify(link)}
                  link={link}
                  handleUrlChange={handleUrlChange}
                />
              ))
            : null}
        </Table.Body>
      </Table>
        <Pagination
          activePage={activePage}
          onPageChange={(e, data) => handlePageChange(e, data)}
          secondary
          totalPages={userLinks?.totalPages}
          ellipsisItem={null}
        />
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 35px;
  background-color: transparent;
  border: 1px dotted teal;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 900;
  color: white;
  transition: all 0.25s ease;
`;

const StyledIcon = styled(Icon)`
  color: gray;
  margin: 3px;
  &:hover {
    color: red;
    zoom: 1.1;
  }
`;

export default LinksDisplay;
