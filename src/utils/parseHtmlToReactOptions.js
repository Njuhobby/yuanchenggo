import { Box, Typography } from "@material-ui/core";
import { domToReact } from "html-react-parser";
import LazySize from "../components/LazySize";

const parseOptions = {
  replace: ({ name, attribs, children }) => {
    if (!attribs) {
      return;
    }

    if (name === "p") {
      return (
        <Typography variant="body1">
          {domToReact(children, parseOptions)}
        </Typography>
      );
    }

    if (name === "img") {
      return (
        <Box
          sx={{
            mt: 3,
            position: "relative",
            pt: "calc(100% / 16 * 9)",
          }}
        >
          <LazySize
            alt="post media"
            src={attribs.src}
            sx={{
              top: 0,
              width: "100%",
              height: "100%",
              borderRadius: 1,
              position: "absolute",
            }}
          />
        </Box>
      );
    }
  },
};

export default parseOptions;
