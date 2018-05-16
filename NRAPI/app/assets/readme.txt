*** Tutorial base for this project ***

    https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq



*** Outhers links ***

    https://blog.risingstack.com/your-first-node-js-http-server/
    https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    http://www.luiztools.com.br/post/tutorial-node-js-com-ms-sql-server/#3



*** Install dependences ***

    npm install express --save
    npm install body-parser --save
    npm install mssql --save



*** To work with Microsoft Sql Server node module ***

    https://www.npmjs.com/package/mssql

    

*** Solve net connection ***

    Note: If there are connection failures on the Sql server for a local server installed, perform the 2 procedures

    1 - It turns out that I also needed to enable the SQL Server Browser windows service like so:

        1. Navigate to "Services"
        2. Select "Properties" on "SQL Server Browser"
        3. Flip "Start up type" to "Automatic"
        4. Start the service

        Font: https://stackoverflow.com/questions/49185969/connectionerror-failed-to-connect-to-localhostundefined-in-15000ms?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

    2 - Enable named pipes on windows net.
        
        Steps:

        1) Accessing Windows Computer Management;
        2) Under 'Services and Applications', access SQL Server Configuration Manager;
        3) Enable named pipes and the TCP/IP on Sql Server Network Configuration;
        4) Access services and restart the service: SQL Server (instance name).



