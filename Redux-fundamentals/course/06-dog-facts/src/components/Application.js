import * as React from "react";

import { Box } from "@twilio-paste/box";
import { Stack } from "@twilio-paste/stack";

import { useSelector } from "react-redux";
import DogFactsForm from "./DogFactsForm";
import Fact from "./Fact";

const Application = () => {
	const facts = useSelector((state) => state.facts);
	const facts2 = useSelector((state) => facts.facts);
	console.log("facts 1", facts.facts);
	console.log("facts 2", facts);
	// console.log(facts.message);
	console.log("facts.length", facts.facts.length);
	console.log("facts2.length", facts2.length);

	return (
		<Box>
			<DogFactsForm />
			<Stack orientation="vertical" spacing="space60">
				{facts.facts.length > 0
					? facts.facts.map((fact, index) => (
							<Fact key={index} fact={fact.fact} />
					  ))
					: null}
			</Stack>
		</Box>
	);
};

export default Application;
