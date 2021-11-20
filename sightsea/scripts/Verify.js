import { getDatabase, ref, remove,
runTransaction } from "firebase/database";

const removeDoc = (dbName, docID) => {
  db = getDatabase();
  reference = ref(db, `${dbName}/documents/${docID}`);
  remove(reference);
  countref = ref(dn, `${dbName}/`);
  runTransaction(countref, (post) => {
    if (post) {
      if (post.count) {
        post.count--;
      }
    }
    return post;
  });
};

export default removeDoc;