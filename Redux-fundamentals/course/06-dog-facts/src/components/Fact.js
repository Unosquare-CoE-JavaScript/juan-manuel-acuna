import React from "react";

import { Card } from "@twilio-paste/card";
import { Heading } from "@twilio-paste/heading";
import { Text } from "@twilio-paste/text";

const Fact = ({ fact }) => {
	return (
		<Card className="dog-fact">
			<Heading variant="heading30" as="h3">
				Dog Fact
			</Heading>
			<Text>{fact}</Text>
		</Card>
	);
};

export default Fact;
