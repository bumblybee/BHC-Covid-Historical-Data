class Corona {
  async getData() {
    const res = await fetch(
      "https://corona.lmao.ninja/v2/historical/usacounties/iowa"
    );

    const data = await res.json();
    return data;
  }

  async getCounties() {
    const res = await fetch(
      "https://covid19.mathdro.id/api/countries/USA/confirmed"
    );

    const data = await res.json();
    return data;
  }
}
