## Briefing

Using a third-party API that provides changing values, implement a caching service using Redis such that every time your function is called, your program only retrieves data from the third party API every 30 seconds.

For instance, you could use a weather forecast or a stock market price API.

Your function must take some input (either a query, a string, or something else – it cannot be a service that always returns a random value with no query).

Write a function that handles the query by taking a parameter as the input. This would be the function that is called when your express route is visited.

Every time a query is made to the API, the returned data is cached along with a timestamp of when it was requested. If the timestamp is older than 30 seconds, then your function will fetch the data again and update the timestamp.

The timestamp should be saved along with the cached data, but there are no requirements about how.

# Requirements

You may use any of the APIs listed here that returns different results each time and accept a parameter. Calls to the same parameter within 30 seconds should return the same result.

10-1.1 Implement a third-party API call using a function call.
10-1.2 Store the results in the cache
10-1.3 Return the cached results for the same query if less than 30 seconds have passed since the last request.

# Submission

Submit a video screen recording of you walking through the code and demonstrating the return value of no more than 2 minutes. You should show the data in Redis after making an initial call and when the cache is no longer valid.
