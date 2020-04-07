import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useWindowSize from '../hooks/use-window-size';
import SearchBar from './search-bar';
import Indices from './major-indices';

import { BASE_API_URL } from '../constants';

function formatDistanceFromNow(publishedAt) {
  let distanceInWords = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  // `about 4 hours ago` -> `4 hours ago`
  return distanceInWords.startsWith('about')
    ? distanceInWords.slice(6)
    : distanceInWords;
}

function NewsHeadlines(props) {
  const [headlines, setHeadlines] = useState([]);
  const { width } = useWindowSize();

  useEffect(() => {
    const url = `${BASE_API_URL}/api/news/top-headlines`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setHeadlines(res.data);
      })
      .catch((err) => {
        console.log(err);
        // TODO: handle errors
      });
  }, []);

  const mostRecentHeadline =
    headlines.length > 0
      ? headlines[0].title.slice(0, headlines[0].title.lastIndexOf('-') - 1)
      : '';

  const source =
    headlines.length > 0
      ? headlines[0].title.slice(
          -(
            headlines[0].title.length -
            headlines[0].title.lastIndexOf('-') -
            2
          ),
        )
      : null;

  console.log('SOURCE', source);

  return (
    <Section>
      <div className="flex-section-a">
        {width >= 770 && <Indices />}
        {headlines.length > 0 && (
          <a
            href={headlines[0].url}
            className="most-recent-story"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="most-recent-story__headline">
              {mostRecentHeadline}
            </div>
            <figure>
              <img
                className="most-recent-story__image"
                src={headlines[0].urlToImage}
                alt=""
              />
              <figcaption>{source}</figcaption>
            </figure>
          </a>
        )}
      </div>

      <div className="flex-section-b">
        {width >= 770 && <SearchBar {...props} />}
        <div className="latest-news">
          <div className="section-title">Latest News</div>
          {headlines
            .filter((_, index) => index > 0 && index <= 5)
            .map((story) => {
              return (
                <div key={story.url} className="article">
                  <div className="time">
                    {formatDistanceFromNow(story.publishedAt)}
                  </div>
                  <a href={story.url} target="_blank" rel="noopener noreferrer">
                    {story.title}
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;

  @media (min-width: 770px) {
    display: flex;
    margin-top: 0;
  }

  .flex-section-a {
    @media (min-width: 770px) {
      margin-right: 2rem;
      margin-bottom: 0;
      min-width: 60%;
      max-width: 60%;
    }
  }

  .most-recent-story {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 2rem;

    /* @media (min-width: 770px) {
      margin-right: 2rem;
      margin-bottom: 0;
      min-width: 60%;
      max-width: 60%;
    } */

    @media (min-width: 900px) {
      line-height: 1.2;
      font-size: 26px;
    }

    &__headline {
      margin-bottom: 1.5rem;
    }

    &__image {
      width: calc(100% + 2rem);
      margin-left: -1rem;

      @media (min-width: 770px) {
        max-width: 100%;
        margin-left: 0;
        margin-bottom: 0;
      }
    }

    figure {
      margin-bottom: 2rem;

      @media (min-width: 770px) {
        margin-bottom: 0;
      }

      figcaption {
        font-weight: normal;
        font-style: italic;
        margin-top: 0.4rem;
        font-size: 0.75rem;
        text-align: right;
      }
    }
  }

  .flex-section-b {
    @media (min-width: 770px) {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .latest-news {
    @media (min-wdith: 770px) {
      margin-top: 3rem;
    }
  }

  .article {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: ${(props) => props.theme.colors.black};
  }

  .time {
    color: ${(props) => props.theme.colors.accent};
    font-size: 0.75rem;
    font-weight: bold;
    margin-bottom: 0.2em;
  }
`;

export default NewsHeadlines;
