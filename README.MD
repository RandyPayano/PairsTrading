
WHAT IS PAIRS TRADING?

A pairs trade strategy is based on the historical correlation of two securities. The securities in a pairs trade must have a high positive correlation, which is the primary driver behind the strategy’s profits. This market-neutral strategy is best deployed when a trader identifies a correlation discrepancy. Relying on the historical notion that the two securities will maintain a specified correlation, the pairs trade can be deployed when this correlation falters. When pairs from the trade deviate, an investor would seek to take a dollar matched the long position in the underperforming security and sell short the outperforming security. If the securities return to their historical correlation, a profit is made from the convergence of the prices.

Pairs Trading | https://pairstrading.herokuapp.com : https://randypayano.github.io/PairsTrading 
<br>
●	Performed cluster analysis to discover pairs of equities which are co-integrated for intelligent portfolio management. 
<br>
●	Queried, cleansed and Reduced dimensionality of return and fundamental data for over 5000 equities.
<br>
●	Utilized unsupervised algorithm DBSCAN to find clusters of similar equities.
●	Applied T-SNE cluster visualization algorithm to re-enforced trust in DBSCAN’s final clusters.
●	Narrowed down list of 8,203,275 possible pairs to 47 co-integrated pairs with 57 unique equities.
●	Built Interactive Dashboard for visualization and analysis, comprising:
o	Company informational profile 
o	Live pairs correlation chart 
o	Live price history charts  
•	Tools: Pandas, NumPy, Financial API, PCA, DBSCAN, T-SNE, Flask, MongoDB, Plot.ly, HTML, CSS, Bootstrap, Heroku


Deployment: https://pairstrading.herokuapp.com/
