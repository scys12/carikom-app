package com.its.samuel.carikom.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@AllArgsConstructor
@Data
@ResponseStatus(HttpStatus.NOT_FOUND)
public class MessageResponse extends Throwable {
    private String message;
}
