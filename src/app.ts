import * as express from 'express';
import * as fs from 'fs';
import * as csv  from 'csv-parser';
import * as cors from 'cors';
import * as path from 'path';


const allowedOrigins = ['http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

class App {
  public express

  constructor () {
    this.express = express()
    
    this.express.use(express.json());
    this.express.use(cors(options))
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    this.express.use('/', router)

    router.post('/postYearGenreOneOptional', async (req: any, res: any) => {
        try {
            const results: Array<Object> = [];
            fs.createReadStream(path.join(__dirname, '../server/assets/data.csv'))
                .pipe(csv())
                .on('data', function (data: any) {
                    try {
                        if (
                            ((req.body.genre1 && data.genre1 === req.body.genre1) || (!req.body.genre1)) &&
                            ((req.body.genre2 && data.genre2 === req.body.genre2) || (!req.body.genre2)) &&
                            ((req.body.year && data.year === req.body.year) || (!req.body.year))
                        ) {
    
                            results.push(data);
                        }
                    }
                    catch (err) {
                        console.log(err)
                    }
                })
                .on('end', function () {
                    res.status(201).json({ res: results });
                });
    
        } catch (e) {
            res.status(500).json({
                message: e
            })
        }
    })

  }
}

export default new App().express