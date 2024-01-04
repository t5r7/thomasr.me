---
layout: default
title: "Next Trains"
metadescription: "A Google Assistant Action to fetch British railway station departures"
image: "next-trains.jpg"
permalink: /next-trains/
---

In 2018 I created a Google Assistant Action to fetch British railway station departures using the wonderful [RealTimeTrains](https://www.realtimetrains.co.uk/) API.

Anyone using the Google Assistant was able to ask queries such as "ask Next Trains about Birmingham Moor Street," to which my Action would reply with the latest departures. Over its 5-year lifespan I continued adding features, including operator and delay information. Crude analytics reveal that at its peak, potentially dozens of people were using it every day to find information about their commutes.

Unfortunately, Google is [sunsetting](https://developers.google.com/assistant/ca-sunset) "conversational actions," which means that I would have to create a companion Android app, or somehow integrate departures into structed data compatible with "Actions from web content." Neither of which I had the time or inclination to do. This meant that in June 2023, the Action ceased to function... and I was a bit sad.

Next Trains was written in PHP and was available on the Actions on Google platform. It was an interesting project, and it being voice controlled made it seem much cooler than it actually was.