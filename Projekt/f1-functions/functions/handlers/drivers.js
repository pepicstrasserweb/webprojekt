const { db } = require("../util/admin");

exports.getAllDrivers = (req, res) => {
  db.collection("drivers")
    .orderBy("voteCount","desc")
    .get()
    .then((data) => {
      let drivers = [];
      data.forEach((doc) => {
        drivers.push({
          driverId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(drivers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.getDriver = (req, res) => {
  let driverData = {};
  db.doc(`/drivers/${req.params.driverId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Driver not found" });
      }

      driverData = doc.data();
      driverData.driverId = doc.id;
      return res.json(driverData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.voteForDriver = (req, res) => {
  const voteDocument = db
    .collection("votes")
    .where("userHandle", "==", req.user.handle)
    .limit(1);

  const driverDocument = db.doc(`/drivers/${req.params.driverId}`);

  let driverData = {};

  driverDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        driverData = doc.data();
        driverData.driverId = doc.id;
        return voteDocument.get();
      } else {
        return res.status(404).json({ error: "Driver not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("votes")
          .add({
            driverId: req.params.driverId,
            userHandle: req.user.handle,
          })
          .then(() => {
            driverData.voteCount++;
            return driverDocument.update({ voteCount: driverData.voteCount });
          })
          .then(() => {
            return res.json(driverData);
          });
      } else {
        return res.status(400).json({ error: "Already voted" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.code });
    });
};

exports.retractVote = (req, res) => {
  const voteDocument = db
    .collection("votes")
    .where("userHandle", "==", req.user.handle)
    .where("driverId", "==", req.params.driverId)
    .limit(1);

  const driverDocument = db.doc(`/drivers/${req.params.driverId}`);

  let driverData = {};

  driverDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        driverData = doc.data();
        driverData.driverId = doc.id;
        return voteDocument.get();
      } else {
        return res.status(404).json({ error: "Driver not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Driver not voted for" });  
      } else {
        return db.doc(`/votes/${data.docs[0].id}`).delete()
          .then(() => {
            driverData.voteCount--;
            return driverDocument.update({ voteCount: driverData.voteCount})
          })
          .then(() => {
            res.json(driverData)
          })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.code });
    });
};


exports.getUsersVote = (req, res) => {

  const voteDocument = db
    .collection("votes")
    .where("userHandle", '==', req.user.handle )
    .limit(1)
    .get()
    .then((data) => {
      let voteData=[];
      data.forEach((doc) => {
        voteData.push({
          ...doc.data(),
        });
      });
      return res.json(voteData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.getCurrentUser = (req, res) => {

  const userDocument = db
    .collection("users")
    .where("handle", '==', req.user.handle )
    .limit(1)
    .get()
    .then((data) => {
      let userData=[];
      data.forEach((doc) => {
        userData.push({
          ...doc.data(),
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};