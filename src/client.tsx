import React, { useState, useEffect } from "react";
import { render, Text, Box } from "ink";
// 11 year old dependency isn't a module, must be require()-d
const keypress = require("keypress");
import { edenTreaty } from "@elysiajs/eden";
import type { App } from "./index";
import type { Emoji } from "./types/database";
import { query } from "express";
const app = edenTreaty<App>("http://localhost:16741");

keypress(process.stdin);
process.stdin.setRawMode(true);

type Key = {
  name: string;
  ctrl: boolean;
};

const Counter = () => {
  const [word, setWord] = useState("");
  const [suggestions, setSuggestions] = useState<Emoji[]>([]);

  useEffect(() => {
    const foo = (_: unknown, key: Key) => {
      // TODO return
      if (key && key.ctrl && key.name == "c") {
        return process.exit(0);
      } else if (key.name === "backspace") {
        return setWord(word.slice(0, -1));
      } else {
        return setWord(word + key.name);
      }
    };

    process.stdin.on("keypress", foo);

    return () => {
      process.stdin.removeListener("keypress", foo);
    };
  }, [word]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const { data, error } = await app.api.v1.emoji.search.get({
        $query: { q: word },
      });

      if (!error) {
        setSuggestions(data.results as unknown as Emoji[]);
      }
    };

    fetchSuggestions();
  }, [word]);

  return (
    <>
      {/* Defaults to space to make sure there is always a line */}
      <Text>{word || " "}</Text>
      <Box flexDirection="row">
        {suggestions.map((suggestion) => (
          <Text key={suggestion.slug}>{suggestion.value}</Text>
        ))}
      </Box>
    </>
  );
};

render(<Counter />);
