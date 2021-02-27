import "gestalt/dist/gestalt.css";
import "./App.css";

import { Box, Container } from "gestalt";
import Search from "./components/search";

const App = () => (
  <Box marginTop={3}>
    <Container>
      <Search />
    </Container>
  </Box>
);

export default App;
