import React, { useState } from "react";

import { Box } from "@twilio-paste/box";
import { Button } from "@twilio-paste/button";
import { Label } from "@twilio-paste/label";
import { Input } from "@twilio-paste/input";
import { Flex } from "@twilio-paste/flex";
import { useDispatch } from "react-redux";
import { fetchDogFactsFromAPI } from "../store/facstSlice";

const DogFactsForm = () => {
	const [value, setValue] = useState(1);
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(fetchDogFactsFromAPI(value));
	};

	return (
		<Box marginBottom="space80">
			<form onSubmit={handleSubmit}>
				<Flex>
					<Box width="100%">
						<Label htmlFor="number-of-facts">Number of Dog Facts</Label>
						<Input
							type="number"
							value={value}
							min="1"
							max="10"
							onChange={(event) => setValue(+event.target.value)}
							id="number-of-facts"
						/>
					</Box>
				</Flex>
				<Box marginY="space40">
					<Button onClick={handleSubmit} fullWidth>
						Fetch
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default DogFactsForm;
