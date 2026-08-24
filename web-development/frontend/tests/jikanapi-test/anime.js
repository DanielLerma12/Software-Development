/* NavSearchID and Main grid creation  */
const animeNavSearchInput = document.getElementById("a-nav-srch-id");

const animeNavResultsContainer = document.querySelector(
  ".a-srch-rlt-main-cont",
);

const noresults = document.querySelector(".no-results");

/* Input Event */
animeNavSearchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    animeNavSearchInput.blur();

    const animeName = animeNavSearchInput.value.trim();

    try {
      const response = await fetch("https://graphql.anilist.co/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
      query ($search: String) {
        Page(perPage: 20) {
          media(search: $search, type: ANIME) {
            id

            title {
              romaji
              english
              native
            }

            type
            format

            episodes
            status

            startDate {
              year
              month
              day
            }

            endDate {
              year
              month
              day
            }

            studios {
              nodes {
                id
                name
              }
            }

            genres

            description(asHtml: false)

            averageScore
            popularity

            rankings {
              rank
              type
              context
              season
              year
            }

            coverImage {
              large
              extraLarge
            }

            siteUrl
          }
        }
      }
    `,
          variables: {
            search: animeName,
          },
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.status === 504) {
        throw new Error(data.message);
      }

      noresults.hidden = true;

      /* innerHTML new data deletion */
      animeNavResultsContainer.innerHTML = "";

      /* for each anime */
      data.data.Page.media.forEach((anime) => {
        /* for each studio */
        let stdlb = "";

        anime.studios.nodes.forEach((studio) => {
          if (stdlb == "") {
            stdlb = studio.name;
          } else {
            stdlb = stdlb + ", " + studio.name;
          }
        });

        if (!anime.studios?.length) {
          stdlb = "Unknown";
        }

        /* for each date */
        let dateFrom = "Unknown";
        let dateTo = "Unknown";
        let formattedDate = "Unknown";

        if (anime.episodes > 1) {
          if (anime.startDate) {
            const { year, month, day } = anime.startDate;

            dateFrom = `${day}-${month}-${year}`;
          }

          if (anime.endDate) {
            const { year, month, day } = anime.endDate;

            dateTo = `${day}-${month}-${year}`;
          }

          formattedDate = `${dateFrom} to ${dateTo}`;
        } else {
          if (anime.startDate) {
            const { year, month, day } = anime.startDate;

            formattedDate = `${day}-${month}-${year}`;
          } else {
            formattedDate = "Unknown";
          }
        }

        /* for each genre */
        let genlb = "";

        anime.genres.forEach((genre) => {
          if (genlb == "") {
            genlb = genre.name;
          } else {
            genlb = genlb + ", " + genre.name;
          }
        });

        if (!anime.genres?.length) {
          genlb = "Unknown";
        }

        /* for each demographics */
        let demographicslb = "";

        anime?.demographics?.forEach((demographic) => {
          if (demographicslb == "") {
            demographicslb = demographic.name;
          } else {
            demographicslb = demographicslb + ", " + demographic.name;
          }
        });

        if (!anime.demographics?.length) {
          demographicslb = "Unknown";
        }

        /* for each synopsis */
        let synolb = "";

        if (!anime.synopsis) {
          synolb = "Unknown";
        } else {
          synolb = anime.synopsis;
        }

        /* for each rank */
        let ranklb = "";

        if (!anime.rank) {
          ranklb = "-";
        } else {
          ranklb = anime.rank;
        }

        /* for each score */
        let scorelb = "";

        if (!anime.score) {
          scorelb = "-";
        } else {
          scorelb = anime.score;
        }

        /* for each popularity */
        let populb = "";

        if (!anime.popularity) {
          populb = "-";
        } else {
          populb = anime.popularity;
        }

        /* for each title */
        let titlelb = "";

        if (anime?.title?.english?.length > 86) {
          titlelb = `${anime.title.english.substring(0, 86)}...`;
        } else {
          titlelb = anime.title.english;
        }

        /* Main grid fill */
        animeNavResultsContainer.innerHTML += `<div class="a-srch-rlt-dad-cont">
                <span class="a-srch-rlt-img-cont">
                    <img src="${anime.coverImage.large}" alt="anime">
                </span>

                <div class="a-srch-rlt-info-cont">
                    <div class="a-srch-rlt-tdata-cont">
                        <div class="a-srch-rlt-title-cont">
                            <p>${titlelb}</p>
                        </div>

                        <div class="a-srch-rlt-extdata-cont">
                            <p>${anime.type}</p>
                            <p>${anime.episodes}</p>
                            <p>${anime.status}</p>
                            <p>${formattedDate}</p>
                            <p>${stdlb}</p>
                            <p>${genlb}</p>
                            <p>${demographicslb}</p>
                        </div>
                    </div>

                    <div class="a-srch-rlt-reg-cont">
                    <div class="a-srch-rlt-reg-lbl">
                        <label>Completed</label>
                    </div>
                    <div class="a-srch-rlt-reg-lbl">
                        <label>Rating</label>
                    </div>
                    <div class="a-srch-rlt-reg-lbl">
                        <label>Episodes</label>
                    </div>
                    </div>
                </div>

                <span class="a-srch-rlt-logscrdes-cont">
                    <div class="a-srch-rlt-logscr-cont">
                        <div class="a-srch-rlt-scr-cont">
                            <div class="a-srch-rlt-scrlbl-cont">
                                <p>Rank</p>
                            </div>
                            <div class="a-srch-rlt-scrnum-cont">
                                <p>${ranklb}</p>
                            </div>
                        </div>
                        <div class="a-srch-rlt-scr-cont">
                            <div class="a-srch-rlt-scrlbl-cont">
                                <p>Score</p>
                            </div>
                            <div class="a-srch-rlt-scrnum-cont">
                                <p>${scorelb}</p>
                            </div>
                        </div>
                        <div class="a-srch-rlt-scr-cont">
                            <div class="a-srch-rlt-scrlbl-cont">
                                <p>Popularity</p>
                            </div>
                            <div class="a-srch-rlt-scrnum-cont">
                                <p>${populb}</p>
                            </div>
                        </div>
                        <div class="a-srch-rlt-log-btn">
                            <button class="a-srch-rlt-log-btn">+ Log</button>
                        </div>
                    </div>

                    <div class="a-srch-rlt-desc-cont">
                        <p>${synolb}</p>
                    </div>
                </span>

            </div>
            `;
      });
    } catch (error) {
      console.log(error);
    }
  }
});

/* Final Edition */
