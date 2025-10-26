const path = require('path');

function buildPublicUrl(req, absoluteFilePath) {
  // absoluteFilePath: .../project/public/uploads/abc.png
  const rel = absoluteFilePath.split(path.sep + 'public').pop(); // "/uploads/abc.png"
  return `${req.protocol}://${req.get('host')}${rel.replace(/\\/g, '/')}`;
}

module.exports = { buildPublicUrl };
