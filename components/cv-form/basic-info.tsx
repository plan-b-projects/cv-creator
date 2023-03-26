import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CvFormValues } from '../../shared-types';

export default function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CvFormValues>();

  return (
    <fieldset>
      <legend>Basic Info</legend>
      <label htmlFor="basicInfo.profilePicture">Profile Picture:</label>
      <input
        type="url"
        {...register('basicInfo.profilePicture')}
        placeholder="https://example.com/example.jpg"
      />
      {errors?.basicInfo?.profilePicture && <p>{errors.basicInfo.profilePicture.message}</p>}

      <label htmlFor="basicInfo.name">Name:</label>
      <input
        {...register('basicInfo.name', { required: 'This is required.' })}
        placeholder="John Doe"
      />
      {errors?.basicInfo?.name && <p>{errors.basicInfo.name.message}</p>}

      <label htmlFor="basicInfo.profileIntro">Introduction:</label>
      <textarea
        {...register('basicInfo.profileIntro', {
          required: 'This is required.',
        })}
        placeholder="Write a short description about yourself..."
      />
      {errors?.basicInfo?.profileIntro && (
        <p>{errors.basicInfo.profileIntro.message}</p>
      )}

      <label htmlFor="basicInfo.location">Location:</label>
      <input
        {...register('basicInfo.location', { required: 'This is required.' })}
        placeholder="Stockholm, Sweden"
      />
      {errors?.basicInfo?.location && (
        <p>{errors.basicInfo.location.message}</p>
      )}

      <label htmlFor="basicInfo.email">Email:</label>
      <input
        type="email"
        {...register('basicInfo.email', { required: 'This is required.' })}
        placeholder="johndoe@email.com"
      />
      {errors?.basicInfo?.email && <p>{errors.basicInfo.email.message}</p>}

      <label htmlFor="basicInfo.tel">Tel:</label>
      <input
        {...register('basicInfo.tel')}
        placeholder="0712345678"
      />
      {errors?.basicInfo?.tel && <p>{errors.basicInfo.tel.message}</p>}

      <label htmlFor="basicInfo.linkedIn">LinkedIn:</label>
      <input
        type="url"
        {...register('basicInfo.linkedIn')}
        placeholder="https://www.linkedin.com/in/johndoe/"
      />
      {errors?.basicInfo?.linkedIn && (
        <p>{errors.basicInfo.linkedIn.message}</p>
      )}

      <label htmlFor="basicInfo.gitHub">GitHub:</label>
      <input
        type="url"
        {...register('basicInfo.gitHub')}
        placeholder="Your GitHub profile link"
      />
      {errors?.basicInfo?.gitHub && <p>{errors.basicInfo.gitHub.message}</p>}

      <label htmlFor="basicInfo.website">Other website:</label>
      <input
        type="url"
        {...register('basicInfo.website')}
        placeholder="Your profile link"
      />
      {errors?.basicInfo?.website && <p>{errors.basicInfo.website.message}</p>}
    </fieldset>
  );
}
