const path = require('path');
const exec = require('@actions/exec');

let deploy = function (params) {
  return new Promise((resolve, reject) => {
    const { folder, bucket, bucketRegion, invalidation, deleteRemoved } = params;

    const deleteRemovedArg = deleteRemoved ? `--deleteRemoved ${deleteRemoved}` : '';

    try {
      const command = `npx s3-deploy@1.4.0 ./** \
                        --bucket ${bucket} \
                        --region ${bucketRegion} \
                        --cwd . \
                        --etag \
                        --gzip xml,html,htm,js,css,ttf,otf,svg,txt \
                        --invalidate "${invalidation}" \
                        --noCache \
                        ${deleteRemovedArg} `;

      const cwd = path.resolve(folder);
      exec.exec(command, [], { cwd }).then(resolve).catch(reject);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = deploy;
