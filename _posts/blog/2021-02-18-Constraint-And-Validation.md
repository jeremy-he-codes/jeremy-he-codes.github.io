---
layout: blog_post
title: UNIQUE constraint and Unique validation (in PostgreSQL & ActiveRecord model)
category: blog
---

Have you ever wondered why you'd define an UNIQUE constraint on a column even when the uniqueness validator is set up in the model?
To some of us, it could just seem safer, but do we know what actually lies behind this assumption?  

--------------------
Today, I am going to demystify the real deal behind this "double lock".  
In a RDBMS, like PostgreSQL, we define foreign key constraints wherever we have `has_many`, `belongs_to` relationships in our models. Why? We know the answer - it improves the querying performance. DB engine indexes records based on the defined table indices, including the foreign key index which helps greatly when it comes to JOIN queries.

Now, wouldn't UNIQUE constraints benefit us in a similar way? The answer is NO. UNIQUE constraints have nothing to do with indexing and querying performance.  
Alright, why are we arguing about this? Isn't it for the obvious purpose of preventing duplicate values entering the DB? - Yes, but why there? The prevention of duplicate values could be handled by the uniqueness validator we set up in the model, along with some smart error messages in case of violations.  

--------------
Imagine a scenario where there come concurrent `POST` requests featuring payloads with same values, i.e. the accidental double-tap of the register button, or three different people attempting to register with the same username at the same time. Does it really happen? Yes, period.  

Of course, we could safely assume that there's no such thing as 100% concurrency. What we are dealing with in this scenario is a set of requests with little gap in their timings.

Let's suppose the saving of a new record to the DB goes through the following process.
- ^: Operation starts
- V: Model uniquess validation occurs
- S: Saves the record to the DB
- $: Operation ends  

`^-----V-----S-----$`

Concurrent requests would look like the following in a chronical depiction:
```
^-----V-----S-----$  
---^-----V-----S-----$
```
Can you sense the danger now?  
V(model validation) would succeed on both of the timelines, leading to the duplicate values in the DB. ¯\\\_(ツ)\_/¯  

Here's comes the proper rescue. Let's inject step D(DB validation) between V(model validation) and S(save) steps.  
`^-----V-----DS-----$`

And the concurrent timelines are overlapped as follows:
```
^-----V-----DS-----$  
---^-----V-----DS-----$  
```
Now, regardless of how the model validation fails to prevent the concurrency, the UNIQUE contraint of the DB ultimately prevents the disaster.  
