import { useEffect, useState } from "react";
import axios from "axios";
import {
  Image,
  Box,
  Text,
  Center,
  Button,
  Input,
  Heading,
} from "@chakra-ui/react";
const GithubUsers = (q = "mojombo", page = 1) => {
  return axios("https://api.github.com/search/users", {
    method: "GET",
    params: {
      q,
      per_page: 4,
      page,
    },
  });
};
export const Github = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);

  useEffect(() => {
    GithubUsers(query, page)
      .then((res) => {
        setData(res.data);
        // console.log("data",data.items);
        setLoading(false);
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
        console.log(err);
        setLoading(false);
      });
  }, [query, page]);

  const handleClick = (query) => {
    setQuery(query);
  };
  console.log("data", data);

  console.log("Query", query);
  return (
    <div>
      <Heading marginBottom={"15px"}>GitHub Users</Heading>
      <div>{loading && <div>hello</div>}</div>
      <SearchBox handleClick={handleClick} />
      {data?.items?.map((item) => {
        return <GithubCard key={item.id} {...item} />;
      })}
      <div>
        <Button
          variant="solid"
          coloScheme="teal"
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          PREV
        </Button>
        <Button
          variant="solid"
          colorScheme="teal"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

const SearchBox = ({ handleClick }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <Box>
        <Input
          htmlSize={20}
          width="auto"
          border={"2px solid grey"}
          type="text"
          style={{ marginRight: "20px" }}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          variant="solid"
          colorScheme={"teal"}
          onClick={() => {
            handleClick(text);
          }}
        >
          Search
        </Button>
      </Box>
    </div>
  );
};

const GithubCard = ({ avatar_url, login }) => {
  return (
    <Center
      style={{
        display: "flex",
        gap: "2rem",
        marginBottom: "15px",
        marginTop: "15px",
      }}
    >
      <Box style={{ display: "flex" }}>
        <Image src={avatar_url} alt="" width="100px" />
        <Text marginLeft={"5px"}>{login}</Text>
      </Box>
    </Center>
  );
};
