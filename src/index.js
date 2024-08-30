const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

const citiesRoutes = require('./routes/citiesRoutes');
const tendersMonthRoutes = require('./routes/tendersMonthRoutes');
const tendersYearRoutes = require('./routes/tendersYearRoutes');
const unitsRoutes = require('./routes/unitsRoutes');
const healthRoutes = require('./routes/healthRoutes');

app.use(cors())

app.use('/cities', citiesRoutes)
app.use('/tenders', tendersMonthRoutes)
app.use('/tenders/year', tendersYearRoutes)
app.use('/units', unitsRoutes)
app.use('/health', healthRoutes)

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`)
})
