import {
  Icon,
  Label,
  Menu,
  Table,
  Input,
  Button,
  Pagination,
} from "semantic-ui-react";
import axios from "../../api/axios";
import { useState } from "react";
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

  const handleEditSubmit = async () => {
    try {
      const response = await axios.get("/dashboard", {
        headers: { "Authorization": `Bearer ${user.accessToken}` }
      });
      await setLinks(response?.data);
    } catch (err) {
      console.log(err, 'err from LinksDisplay handleEditSubmit');
    }
  };

  return (
    <TableContainer>
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
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Original URL</Table.HeaderCell>
            <Table.HeaderCell>Shortened URL</Table.HeaderCell>
            <Table.HeaderCell>Clicks</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userLinks?.links?.docs.length
            ? userLinks.links.docs.map((link) => (
                <LinkRow

                  key={JSON.stringify(link)}
                  link={link}
                  handleEdit={handleEditSubmit}
                />
              ))
            : null}
        </Table.Body>
        <Pagination
          defaultActivePage={1}
          totalPages={10}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
        />
      </Table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 50vw;
  background-color: #8ebcbc;
  padding: 15px;
  border-radius: 5px;
  z-index: 0;
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
