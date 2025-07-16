const Airtable = require('airtable');

// Use your existing environment variables or paste your API key/base ID here
const apiKey = process.env.AIRTABLE_API_KEY || 'YOUR_API_KEY';
const baseId = process.env.AIRTABLE_BASE_ID || 'YOUR_BASE_ID';

const base = new Airtable({ apiKey }).base(baseId);

async function fetchAll(table) {
  const records = [];
  await base(table).select().eachPage((page, fetchNextPage) => {
    records.push(...page);
    fetchNextPage();
  });
  return records;
}

async function fixArtistLinks() {
  console.log('Fetching all artists...');
  const artistRecords = await fetchAll('Artists');
  console.log(`Found ${artistRecords.length} artists.`);
  const nameToId = {};
  const idToName = {};
  for (const record of artistRecords) {
    const name = record.get('Name');
    if (name) {
      nameToId[name.trim()] = record.id;
      idToName[record.id] = name.trim();
    }
  }

  console.log('Fetching all services...');
  const serviceRecords = await fetchAll('Services');
  console.log(`Found ${serviceRecords.length} services.`);

  let fixedCount = 0;
  for (const service of serviceRecords) {
    const serviceName = service.get('Name');
    const linkedArtists = service.get('Artist ID');
    if (!linkedArtists || linkedArtists.length === 0) continue;

    for (const linked of linkedArtists) {
      const artistId = linked;
      const artistName = idToName[artistId];
      if (!artistName) {
        console.log(`Service "${serviceName}" links to unknown artist ID: ${artistId}`);
        continue;
      }
      //