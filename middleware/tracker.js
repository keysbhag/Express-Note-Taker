const tracker = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    const fgRed = '\x1b[31m';
    const fgYellow = '\x1b[33m';
    const fgGreen = '\x1b[32m';
    switch (req.method) {
      case 'GET': {
        console.info(`📗 ${fgGreen}${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      case 'DELETE': {
        console.info(`📕${fgRed}${req.method} request to ${req.path}`);
        break;
      }
      default:
        console.log(`📙${fgYellow}${req.method} request to ${req.path}`);
    }
  
    next();
  };
  
exports.tracker = tracker;