import styled from "styled-components";
import { useState } from "react";
import axios from "../../api/axios";
import {
  Icon,
  Label,
  Menu,
  Table,
  Input,
  Button,
  Pagination,
} from "semantic-ui-react";

const LinkRow = (props) => {
  const link = props.link;

  const [userInput, setUserInput] = useState({});
  const [editRow, setEditRow] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const newState = { ...userInput, urlKey: link.urlKey };
    newState[e.target.name] = e.target.value;
    setUserInput(newState);
  };

  const handleEdit = async (e) => {
    if (!Object.keys(userInput).length) {
      setEditRow(false);
    }
    try {
      const response = await axios.put("/shorten", userInput);
      if (response?.status === 201) {
        setEditRow(false);
        props.handleUrlChange();
      }
    } catch (err) {
      setError(err?.message);
    }
  };

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete("/shorten", {
        data: { urlKey: e.target.id },
      });
      props.handleUrlChange();
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <Table.Row style={{ width: "100px" }}>
      <Table.Cell width={1}>
        {editRow === link.urlKey ? (
          <>
            <Input
              name="newTitle"
              defaultValue={link.title ? link.title : "--"}
              onChange={(e) => handleChange(e)}
            />
          </>
        ) : link.title ? (
          link.title
        ) : (
          "--"
        )}
      </Table.Cell>
      <Table.Cell>
        {editRow === link.urlKey ? (
          <>
            <Input
              name="newUrlKey"
              label={"minifymy.link/"}
              placeholder={link.urlKey}
              error={error ? true : false}
              onChange={(e) => handleChange(e)}
            />
          </>
        ) : (
          link.original_url
        )}
      </Table.Cell>
      <Table.Cell>{link.shortened_url}</Table.Cell>
      <Table.Cell>{link.clicks}</Table.Cell>
      <Table.Cell>
        {!editRow ? (
          <StyledIcon
            color="grey"
            name="pencil"
            id={link.urlKey}
            onClick={() => setEditRow(link.urlKey)}
          />
        ) : (
          <StyledIcon
            name="save"
            color="green"
            size="large"
            id={link.urlKey}
            onClick={(e) => handleEdit(e)}
          />
        )}
        <StyledIcon
          name="trash"
          id={link.urlKey}
          onClick={(e) => handleDelete(e)}
        />
      </Table.Cell>
    </Table.Row>
  );
};

const StyledIcon = styled(Icon)`
  color: gray;
  margin: 3px;
  &:hover {
    color: red;
    zoom: 1.1;
  }
`;

export default LinkRow;
