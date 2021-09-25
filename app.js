var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

var mongoose = require('mongoose');
var mongodbUrl = require('./config/config').MONGODB_CONNECTION_STRING;
mongoose.connect( mongodbUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log('Mongodb Connected'))
.catch(err => console.log('err', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ 
    limit: '50mb',
    extended: true,
    parameterLimit: 50000 
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);

/**
 * GLOBALS STARTS HERE
 */
app.locals.left_side_categories = {
    culture: 'Culture',
    fashion: 'Fashion',
    featured_posts: 'Featured Posts',
    food_genel: 'Food Genel',
    magzine: 'Magzine',
    music: 'Music',
    sports: 'Sports',
};

app.locals.left_side_pages = {
    latest_jobs: 'Latest Jobs',
    jobs_closing_soon: 'Jobs Closing Soon',
    upcoming_jobs: 'Upcoming Jobs',
    join_us_on_whatsapp: 'Join Us On Whatsapp',
    join_us_on_telegram: 'Join Us On Telegram',
    join_us_on_facebook: 'Join Us On Facebook',
    join_us_on_twitter: 'Join Us On Twitter',
    join_us_on_linkedin: 'Join Us On LinkedIn',
    download_jobsnplacemnents_android_app_from_google_play_store: 'Download Jobsnplacemnents Android App From Google Play Store',
    home: 'Home',
    about_us: 'About Us',
    contact_us: 'Contact Us',
    disclaimer: 'Disclaimer',
    privacy_policy: 'Privacy Policy',
    importance_of_government_jobs_in_india: 'Importance of Government Jobs in India',
    how_to_choose_the_right_government_job_for_you_in_india: 'How to choose the right government job for you',
    frequently_asked_questions_faqs: 'Frequently asked Questions',
};

app.locals.right_side_tags = {
    culture: 'Culture',
    fashion: 'Fashion',
    featured_posts: 'Featured Posts',
    food_genel: 'Food Genel',
    magzine: 'Magzine',
    music: 'Music',
    sports: 'Sports',
};

app.locals.right_side_states = {
    andaman_and_nicobar: 'Andaman-&-Nicobar',
    andhra_pradesh: 'Andhra-Pradesh',    
    arunachal_pradesh: 'Arunachal-Pradesh',
    assam: 'Assam',
    bihar: 'Bihar',
    chandigarh: 'Chandigarh',
    chhattisgarh: 'Chhattisgarh',
    dadra_and_nagar_haveli: 'Dadra & Nagar Haveli',
    daman_and_diu: 'Daman & Diu',
    delhi: 'Delhi',
    goa: 'Goa',
    gujarat: 'Gujarat',
    haryana: 'Haryana',
    himachal_pradesh: 'Himachal Pradesh',
    jammu_and_kashmir: 'Jammu & Kashmir',
    jharkhand: 'Jharkhand',
    karnataka: 'Karnataka',
    kerala: 'Kerala',
    lakshadweep: 'Lakshadweep',
    madhya_pradesh: 'Madhya Pradesh',
    maharashtra: 'Maharashtra',
    manipur: 'Manipur',
    meghalaya: 'Meghalaya',
    mizoram: 'Mizoram',
    nagaland: 'Nagaland',
    odisha: 'Odisha',
    puduchhery: 'Puduchhery',
    punjab: 'Punjab',
    rajasthan: 'Rajasthan',
    sikkim: 'Sikkim',
    tamil_nadu: 'Tamil Nadu',
    telangana: 'Telangana',
    tripura: 'Tripura',
    uttarakhand: 'Uttarakhand',
    uttar_pradesh: 'Uttar Pradesh',
    westbengal: 'West Bengal'    
};

app.locals.left_side_qualification = {
    th8: '8th',
    th10: '10th',
    aeronautical_engineering: 'Aeronautical Engineering',
    anm: 'ANM',
    any_degree: 'Any Degree',
    architectural_engineering: 'Architectural Engineering',
    automobile_engineering: 'Automobile Engineering',
    bed: 'B.Ed',
    bpharm: 'B.Pharm',
    bsc: 'B.Sc',
    bsc_nursing: 'B.sc Nursing',
    bvsc: 'B.V.Sc',
    bams: 'BAMS',
    bds: 'BDS',
    bhms: 'BHMS',
    bums: 'BUMS',
    caicwai: 'CA - ICWAI',
    chemical_engineering: 'Chemical Engineering',
    civil_engineering: 'Civil Engineering',
    computer_science_engineering: 'Computer Science Engineering',
    diploma: 'Diploma',
    dmlt: 'DMLT',
    electrical_and_instrumentation: 'Electrical and Instrumentation',
    electrical_engineering: 'Electrical Engineering',
    electronics_and_communication_engineering: 'Electronics and Communication Engineering',
    gate: 'GATE',
    gnm: 'GNM',
    hotel_management: 'Hotel Management',
    information_technology:'Information Technology',
    intermediate:'Intermediate (10+2)',
    iti:'ITI',
    llb:'LLB',
    ma:'M.A',
    mtech:'M.E / M.Tech',
    mpharm:'M.Pharm',
    mphill:'M.Phil',
    phd:'Ph.D',
    msc:'M.Sc',
    msc_nursing:'M.sc Nursing',
    mvsc:'M.V.Sc',
    mba:'MBA',
    mba:'MBA',
    mbbs:'MBBS',
    mca:'MCA',
    mechanical_engineering:'Mechanical Engineering',
    medical:'Medical',
    mining_engineering:'Mining Engineering',
    msmd:'MS - MD',
    petroleum_engineering:'Petroleum Engineering',
    pgdm:'PGDM',
    pharmacy:'Pharmacy',
    post_graduation:'Post Graduation',
    sports_quota:'Sports Quota',
    staff_nurse:'Staff Nurse',
};

app.locals.base_url = 'https://www.jobsnplacements.com';
/**
 * GLOBALS ENDS HERE
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
