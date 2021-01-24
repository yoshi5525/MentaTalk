<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    public function members() {
        return $this->belongsToMany('App\Models\Member', 'team_member', 'team_id', 'member_id')
                    ->withPivot('id', 'admin_member_id');
    }

    public function messages() {
        return $this->belongsToMany('App\Models\Member', 'messages', 'team_id', 'member_id')
                    ->withPivot(['id', 'member_id', 'team_id', 'message', 'registered_at']);
    }

    public function techs() {
        return $this->belongsToMany('App\Models\Member', 'techs', 'team_id', 'member_id')
                    ->withPivot(['id', 'member_id', 'team_id', 'language_id', 'code', 'link', 'command', 'created_at']);
    }
}
