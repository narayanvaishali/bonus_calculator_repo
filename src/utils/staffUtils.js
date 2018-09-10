import firebase from "firebase";

const db = firebase.database();

export function getStaffs(done) {
  db.ref("staff").once("value", snapshot => {
    const staffs = snapshot.val();

    const list = Object.keys(staffs).map(id => {
      const { initials, name, designation, email, phone, code } = staffs[id];
      return {
        id,
        initials,
        name,
        designation,
        email,
        phone,
        code
      };
    });

    done(list);
  });
}

export function getStaff(id, done) {
  db.ref(`staff/${id}`).once("value", snapshot => {
    const staff = snapshot.val();
    done(staff);
  });
}

export function createStaff(staff, done) {
  db.ref(`staff`)
    .push(staff)
    .then(res => done(false, res))
    .catch(err => done(err, undefined));
}

export function updateStaff(id, staff, done) {
  db.ref(`staff/${id}`)
    .update(staff)
    .then(res => {
      console.log(res);
      done(false);
    })
    .catch(err => {
      done(err, undefined);
    });
}

export function deleteStaff(id, done) {
  db.ref(`staff/${id}`)
    .remove()
    .then(() => {
      done(false);
    })
    .catch(err => {
      done(err);
    });
}
