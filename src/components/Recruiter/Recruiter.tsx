import netherlandsRecruiter from './jeremy-akeze-doghouse-it-recruitment.jpg';
import * as S from './style';

const Recruiter = () => (
  <S.Container data-cy="recruiter-container">
    <S.Thumbnail data-cy="recruiter-thumbnail">
      <img
        alt="Jeremy Akeze - Doghouse IT Recruitment"
        src={netherlandsRecruiter}
        data-cy="recruiter-image"
      />
    </S.Thumbnail>
    <S.Description data-cy="recruiter-description">
      <h4 data-cy="recruiter-work-title">
        Work in the Netherlands
        <S.Flag data-cy="recruiter-country-flag" />
      </h4>
      <p data-cy="recruiter-message">
        Hi! I'm Jeremy Akeze from Doghouse IT Recruitment and I'm looking for
        skilled Software Engineers like you. If you wish to move abroad,{' '}
        <a
          href="https://www.linkedin.com/in/jeremy-akeze-9542b396/"
          data-cy="recruiter-linkedin-link"
        >
          <b>follow me on Linkedin.</b>
        </a>
      </p>
    </S.Description>
  </S.Container>
);

export default Recruiter;
