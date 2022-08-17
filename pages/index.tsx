import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import {
  Section,
  Row,
  LeftColumn,
  RightColumn,
  Heading,
  Paragraph,
  Background,
  MiddleSection,
  Form,
  Input,
  ShortenButton,
  Links,
  ListItem,
  RightSide,
  LongLink,
  ShortLink,
  CopyButton,
  BottomSection,
  Repository,
  RepositoryHeading,
  RepositoryLink,
} from '../styles/styles';

interface Links {
  shortUrl: string;
  longUrl: string;
}

const regExpression =
  '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,3}(:[0-9]{1,5})?(/.*)?$';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [copied, setCopied] = useState<string[]>([]);
  const [links, setLinks] = useState<Links[]>([]);

  useEffect(() => {
    if (localStorage.getItem('storedLinks')) {
      const storedLinks = JSON.parse(localStorage.getItem('storedLinks')!);
      setLinks(storedLinks);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const {
        data: { shortUrl },
      } = await axios.post('api/shorten', { longUrl });

      const storedLinks = [{ shortUrl, longUrl }, ...links.slice(0, 2)];
      setLinks(storedLinks);
      localStorage.setItem('storedLinks', JSON.stringify(storedLinks));

      setLongUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (shortUrl: string) => {
    const url = `https://${window.location.hostname}/${shortUrl}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied([shortUrl, ...copied]);
        setTimeout(() => {
          setCopied((prevState) => prevState.filter((url) => url !== shortUrl));
        }, 2000);
      },
      () => {
        alert('Could not copy link to the clipboard');
      }
    );
  };

  return (
    <>
      <Head>
        <title>URLO</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Section>
        <Heading>URLO</Heading>

        <Row>
          <LeftColumn>
            <Heading>Link shortening service</Heading>
            <Paragraph>
              You can make a short link from a long one for free using our
              service
            </Paragraph>
          </LeftColumn>

          <RightColumn>
            <Image
              src='/illustration-working.svg'
              alt='Link shortening service'
              layout='fill'
              objectFit='contain'
              priority={true}
            />
          </RightColumn>
        </Row>
      </Section>

      <Background>
        <MiddleSection>
          <Form onSubmit={handleSubmit}>
            <Input
              name='link'
              value={longUrl}
              onChange={(e) => {
                setLongUrl(e.target.value);
                (e.target as HTMLInputElement).setCustomValidity('');
              }}
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  'Not valid link'
                )
              }
              pattern={regExpression}
              placeholder='Shorten your link'
              required
            />
            <ShortenButton type='submit'>Shorten It!</ShortenButton>
          </Form>

          {links.length !== 0 && (
            <Links>
              {links.map((link) => {
                return (
                  <ListItem key={link.shortUrl}>
                    <LongLink>{link.longUrl}</LongLink>
                    <RightSide>
                      <ShortLink href={link.shortUrl}>
                        {`${window.location.hostname}/${link.shortUrl}`}
                      </ShortLink>

                      {copied.includes(link.shortUrl) ? (
                        <CopyButton copy>Copied</CopyButton>
                      ) : (
                        <CopyButton onClick={() => handleClick(link.shortUrl)}>
                          Copy
                        </CopyButton>
                      )}
                    </RightSide>
                  </ListItem>
                );
              })}
            </Links>
          )}
        </MiddleSection>
      </Background>

      <BottomSection>
        <Repository>
          <RepositoryHeading>Source Code</RepositoryHeading>
          <RepositoryLink href='https://github.com/mvximenko/urlo'>
            GO TO REPOSITORY
          </RepositoryLink>
        </Repository>
      </BottomSection>
    </>
  );
}
